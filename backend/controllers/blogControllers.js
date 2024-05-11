const {
  Blog,
  User,
  BlogViews,
  Commentar,
  Category,
  BlogCategory,
} = require("../helper/relation");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

exports.getBlogs = async (req, res) => {
  try {
    const data = await Blog.findAll({
      attributes: { exclude: ["userId", "categoryId"] },
      include: [
        {
          model: Commentar,
          as: "comments",
          attributes: ["id", "userId", "commentar"],
        },
        {
          model: Category,
          as: "categories",
          through: { attributes: [] },
          attributes: ["id", "category"],
        },
      ],
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
      attributes: {
        exclude: ["userId"],
      },
      include: [
        {
          model: Commentar,
          as: "comments",
          attributes: ["id", "userId", "commentar"],
        },
        {
          model: Category,
          as: "categories",
          through: { attributes: [] },
          attributes: ["id", "category"],
        },
      ],
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

exports.getBlogByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId", "categoryId"] },
      include: [
        {
          model: Commentar,
          as: "comments",
          attributes: ["id", "userId", "commentar"],
        },
        {
          model: Category,
          as: "categories",
          through: { attributes: [] },
          attributes: ["id", "category"],
        },
      ],
    });

    const data = blogs.filter((blog) => {
      return blog.categories.some(
        (data) => data.category.toLowerCase() === category.toLowerCase()
      );
    });

    if (!data.length) {
      return res
        .status(404)
        .json({ msg: `Tidak ada blog dengan category ${category}` });
    } else {
      return res.status(200).json({ status: "Ok", total: data.length, data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

function trimmedValue(value) {
  const isString = typeof value === "string" ? value : String(value);
  return isString.trim() ? true : false;
}

exports.createBlog = async (req, res) => {
  const { categoryId, title, content, author, source_link, status } = req.body;

  try {
    let thumbnail = "";

    if (!req.files || !req.files.thumbnail) {
      const defaultThumbnailPath = "./public/images/default-thumbnail/default-thumbnail.png";
      if (fs.existsSync(defaultThumbnailPath)) {
        thumbnail = `${req.protocol}://${req.get(
          "host"
        )}/images/default-thumbnail/default-thumbnail.png`;
      } else {
        return res
          .status(500)
          .json({ msg: "File default thumbnail tidak ditemukan" });
      }
    } else {
      const imageFile = req.files.thumbnail;
      const imageTimestamp = Date.now();
      const imageExt = path.extname(imageFile.name);
      const imageRandomString = crypto.randomBytes(8).toString("hex");
      const thumbnailBlog = `${imageTimestamp}-${imageRandomString}${imageExt}`;
      const thumbnailPath = `./public/images/thumbnail-blogs/${thumbnailBlog}`;
      thumbnail = `${req.protocol}://${req.get(
        "host"
      )}/images/thumbnail-blogs/${thumbnailBlog}`;

      const allowedType = [".png", ".jpg", ".jpeg"];
      if (!allowedType.includes(imageExt.toLowerCase()))
        return res.status(422).json({ msg: "invalid image type" });

      const maxSize = 10000000;
      if (imageFile.size > maxSize) {
        return res.status(422).json({ msg: "tidak boleh melebihi 10mb" });
      }

      imageFile.mv(thumbnailPath, async (err) => {
        if (err) {
          return res.status(500).json({ msg: err.message });
        }
      });
    }

    if (
      !trimmedValue(title) ||
      !trimmedValue(content) ||
      !Array.isArray(categoryId) ||
      !trimmedValue(status)
    ) {
      return res.status(400).json({ msg: "Data tidak boleh kosong" });
    }

    const userId = req.userId;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ msg: "User tidak ada" });

    try {
      const newBlog = await Blog.create({
        userId,
        title,
        content,
        author: author || user.username,
        thumbnail: thumbnail || "",
        source_link,
        views: 0,
        status,
      });

      await Promise.all(
        categoryId.map(async (categoryId) => {
          const category = await Category.findAll({
            where: { id: categoryId },
          });
          if (!category)
            throw new Error(`Tidak ada category dengan id ${categoryId}`);

          await BlogCategory.create({ blogId: newBlog.id, categoryId });
        })
      );

      res.status(201).json({ status: "Created", newBlog });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.updateBlog = async (req, res) => {
  const blogId = req.query.blogId;
  const { title, content, author, source_link, status, categoryId } = req.body;

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
      thumbnail: thumbnail || blog.thumbnail,
      source_link: source_link || blog.source_link,
      status: status || blog.status,
    });

    if (categoryId && Array.isArray(categoryId)) {
      await BlogCategory.destroy({ where: { blogId: blogId } });
      await Promise.all(
        categoryId.map(async (categoryId) => {
          const category = await Category.findByPk(categoryId);
          if (!category)
            throw new Error(`Category with id ${categoryId} not found`);
          await BlogCategory.create({ blogId: blog.id, categoryId });
        })
      );
    }

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

    await BlogCategory.destroy({ where: { blogId: blogId } });
    await blog.destroy();

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
