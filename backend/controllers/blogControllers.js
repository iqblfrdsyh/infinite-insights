const { Blog, User, BlogViews } = require("../helper/relation");
const path = require("path");
const crypto = require("crypto");

exports.getBlogs = async (req, res) => {
  try {
    const data = await Blog.findAll({
      attributes: { exclude: ["userId"] },
    });
    !data.length
      ? res.json({ msg: "Tidak ada data blog" })
      : res.status(200).json({ status: "Ok", total: data.length, data });
  } catch (error) {
    console.log(error);
  }
};

exports.getBlogById = async (req, res) => {
  const blogId = req.query.blogId;
  const userId = req.userId;

  try {
    const viewed = await BlogViews.findAll({
      where: {
        blogId,
        viewedBy: userId,
      },
    });

    if (!viewed.length) {
      console.log(`user ${userId} view blog ditambah`);
      await BlogViews.create({ blogId: blogId, viewedBy: userId });

      await Blog.increment("views", { where: { id: blogId } });
    }

    const blog = await Blog.findAll({
      where: { id: blogId },
      attributes: { exclude: ["userId"] },
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ status: "Ok", blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

function trimmedValue(value) {
  const isString = typeof value === "string" ? value : String(value);
  return isString.trim() ? true : false;
}

exports.createBlog = async (req, res) => {
  const { title, content, author, category, source_link, status } = req.body;

  try {
    if (!req.files || !req.files.thumbnail) {
      return res.status(400).json({ msg: "Masukkan Gambar" });
    }

    if (
      !trimmedValue(title) ||
      !trimmedValue(content) ||
      !trimmedValue(category) ||
      !trimmedValue(status)
    ) {
      return res.status(400).json({ msg: "Data tidak boleh kosong" });
    }

    const userId = req.userId;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ msg: "User tidak ada" });

    const imageFile = req.files.thumbnail;
    const imageTimestamp = Date.now();
    const imageExt = path.extname(imageFile.name);
    const imageRandomString = crypto.randomBytes(8).toString("hex");
    const thumbnailBlog = `${imageTimestamp}-${imageRandomString}${imageExt}`;
    const thumbnail = `${req.protocol}://${req.get(
      "host"
    )}/images/thumbnail-blogs/${thumbnailBlog}`;
    const imagePath = `./public/images/thumbnail-blogs/${thumbnailBlog}`;

    const allowedType = [".png", ".jpg", ".jpeg"];
    if (!allowedType.includes(imageExt.toLowerCase()))
      return res.status(422).json({ msg: "invalid image type" });

    const maxSize = 10000000;
    if (imageFile.size > maxSize) {
      return res.status(422).json({ msg: "tidak boleh melebihi 10mb" });
    }

    imageFile.mv(imagePath, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }

      try {
        const newBlog = await Blog.create({
          userId,
          title,
          content,
          author: author || user.username,
          category,
          thumbnail,
          source_link,
          views: 0,
          status,
        });

        res.status(201).json({ status: "Created", newBlog });
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.updateBlog = async (req, res) => {
  const blogId = req.query.blogId;
  const { title, content, author, category, source_link, status } = req.body;

  try {
    const blog = await Blog.findOne({ where: { id: blogId } });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    let thumbnail = blog.thumbnail;
    if (req.files && req.files.thumbnail) {
      const imageFile = req.files.thumbnail;
      const imageTimestamp = Date.now();
      const imageExt = path.extname(imageFile.name);
      const imageRandomString = crypto.randomBytes(8).toString("hex");
      const newThumbnailBlog = `${imageTimestamp}-${imageRandomString}${imageExt}`;
      const newThumbnail = `${req.protocol}://${req.get(
        "host"
      )}/images/thumbnail-blogs/${newThumbnailBlog}`;
      const imagePath = `./public/images/thumbnail-blogs/${newThumbnailBlog}`;

      const allowedType = [".png", ".jpg", ".jpeg"];
      if (!allowedType.includes(imageExt.toLowerCase()))
        return res.status(422).json({ msg: "Invalid image type" });

      const maxSize = 10000000;
      if (imageFile.size > maxSize) {
        return res
          .status(422)
          .json({ msg: "Image size should not exceed 10mb" });
      }

      imageFile.mv(imagePath, (err) => {
        if (err) {
          return res.status(500).json({ msg: err.message });
        }
      });

      thumbnail = newThumbnail;
    }

    await blog.update({
      title: title || blog.title,
      content: content || blog.content,
      author: author || blog.author,
      category: category || blog.category,
      thumbnail: thumbnail,
      source_link: source_link || blog.source_link,
      status: status || blog.status,
    });

    return res
      .status(200)
      .json({ message: "Blog updated successfully", updatedBlog: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteBlog = async (req, res) => {
  const blogId = req.query.blogId;

  try {
    const blog = await Blog.findOne({ where: { id: blogId } });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await BlogViews.destroy({ where: { blogId: blogId } });

    await blog.destroy();

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
