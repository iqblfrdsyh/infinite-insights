const { Commentar, Blog, User } = require("../helper/relation");

exports.getComments = async (req, res) => {
  try {
    const data = await Commentar.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["id", "fullname", "username"],
      },
      attributes: { exclude: ["userId"] },
    });
    !data.length
      ? res.status(404).json({ msg: "Tidak ada komentar" })
      : res.status(200).json({ status: "Ok", total: data.length, data });
  } catch (error) {
    console.log(error);
  }
};

function trimmedValue(value) {
  const isString = typeof value === "string" ? value : String(value);
  return isString.trim() ? true : false;
}

exports.createComment = async (req, res) => {
  try {
    const { commentar } = req.body;
    const userId = req.userId;
    const blogId = req.query.blogId;

    if (!trimmedValue(commentar))
      return res.status(400).json({ msg: "Komentar tidak boleh kosong" });

    const blog = await Blog.findByPk(blogId);
    if (!blog) return res.status(404).json({ msg: "Blog tidak ditemukan" });

    const newComment = await Commentar.create({
      blogId,
      userId,
      commentar,
    });

    res.status(201).json({ status: "Posted", newComment });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.query.commentId;
    const userId = req.userId;

    const comment = await Commentar.findOne({
      where: { id: commentId, userId: userId },
    });

    if (!comment)
      return res.status(404).json({ message: "Komentar tidak ditemukan" });

    await comment.destroy();

    return res.status(200).json({ message: "Komentar berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
