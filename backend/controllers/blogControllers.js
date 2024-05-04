const { Blog, User } = require("../helper/relation");
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
  const blogId = req.params.blogId;
  const userId = req.userId;

  try {
    if (!userId) {
      return res.json({ msg: "Login terlebih dahulu" });
    }

    let viewedBlogs = req.cookies ? req.cookies.viewedBlogs || {} : {};
    let addView = false;

    if (!viewedBlogs[userId] || !viewedBlogs[userId].includes(blogId)) {
      if (!viewedBlogs[userId]) {
        viewedBlogs[userId] = [];
      }
      viewedBlogs[userId].push(blogId);
      res.cookie("viewedBlogs", viewedBlogs, { maxAge: 24 * 60 * 60 * 1000 });
      addView = true;
    }

    const blog = await Blog.findOne({
      where: { id: blogId },
    });

    if (!blog) {
      return res.json({ msg: `Blog dengan id ${blogId} tidak ditemukan` });
    }

    blog.viewsBy = blog.views || [];

    if (addView) {
      if (!blog.viewsBy.includes(userId)) {
        blog.views = blog.views ? blog.views + 1 : 1; 
        blog.viewsBy.push(userId);
        await blog.save();
      }
    }

    const data = await Blog.findAll({
      where: { id: blogId },
      attributes: { exclude: ["userId"] },
    });

    res.status(200).json({ status: "Ok", blogId, data });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Terjadi kesalahan saat mengambil data blog" });
  }
};

exports.createBlog = async (req, res) => {
  const { title, content, author, category, source_link, status } = req.body;

  try {
    if (!req.files || !req.files.thumbnail) {
      return res.status(400).json({ msg: "Masukkan Gambar" });
    }

    if (!title || !content || !category || !status) {
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
