const { Category, Blog } = require("../helper/relation");

exports.getCategories = async (req, res) => {
  try {
    const data = await Category.findAll({
      include: { model: Blog, as: "blogs" },
    });
    !data.length
      ? res.json({ msg: "Tidak ada data category" })
      : res.status(200).json({ status: "Ok", total: data.length, data });
  } catch (error) {
    console.log(error);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const newCategory = await Category.create({
      category,
    });

    res.status(201).json({ status: "created", newCategory });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.query;

    const category = await Category.findOne({ where: { id: categoryId } });

    if (!category) {
      return res
        .status(404)
        .json({ msg: `Tidak ada kategori dengan id ${categoryId}` });
    }

    await category.destroy();

    await Blog.update({ categoryId: null }, { where: { categoryId } });

    res.status(200).json({ status: "deleted", categoryId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};
