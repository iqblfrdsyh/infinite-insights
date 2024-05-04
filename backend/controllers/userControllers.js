const { User, Blog } = require("../helper/relation");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  try {
    const data = await User.findAll({
      include: [{ model: Blog, as: "blogs" }],
    });
    !data.length
      ? res.json({ msg: "Tidak ada data user" })
      : res.status(200).json({ status: "Ok", total: data.length, data });
  } catch (error) {
    console.log(error);
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.query.userId;
  try {
    const data = await User.findAll({ where: { id: userId } });
    !data.length
      ? res.json({ msg: `Tidak ada user dengan insight ID : ${userId}` })
      : res.status(200).json({ status: "Ok", data });
  } catch (error) {
    console.log(error);
  }
};

function trimmedValue(value) {
  const isString = typeof value === "string" ? value : String(value);
  return isString.trim() ? true : false;
}

exports.userSignup = async (req, res) => {
  const { fullname, username, password, headline, confirmPassword } = req.body;
  try {
    if (
      !trimmedValue(fullname) ||
      !trimmedValue(username) ||
      !trimmedValue(password) ||
      !trimmedValue(confirmPassword)
    ) {
      return res.status(400).json({ msg: "Data tidak boleh kosong" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Konfirmasi Password Tidak Sesuai" });
    }

    const existingUsername = await User.findAll({
      where: { username: username },
    });

    if (existingUsername.length > 0) {
      return res.status(400).json({ msg: "Username sudah ada" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const randomChara = uuidv4().slice(0, 5);
    const userID = `InsightsID-${randomChara}`;

    const newUser = await User.create({
      id: userID,
      fullname,
      username,
      headline: headline || "",
      password: hashedPassword,
    });

    res.status(201).json({ status: "Created", newUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat proses registrasi" });
  }
};

exports.userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findAll({
      where: {
        username: username,
      },
    });

    if (!trimmedValue(username) || !trimmedValue(password)) {
      return res.status(400).json({ msg: "Input tidak boleh kosong" });
    }

    if (user.length === 0) {
      return res.status(404).json({ msg: "Username tidak ditemukan" });
    }

    const match = await bcrypt.compare(password, user[0].password);
    if (!match) {
      return res.status(400).json({ msg: "Password salah!" });
    }

    const userId = user[0].id;
    const fullname = user[0].fullname;
    const uname = user[0].username;
    const headline = user[0].headline;

    const accessToken = jwt.sign(
      { userId, uname },
      process.env.SECRET_ACCESS_TOKEN,
      {
        expiresIn: "2m",
      }
    );
    const refreshToken = jwt.sign(
      { userId, uname },
      process.env.SECRET_REFRESH_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    await User.update(
      { refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
    });

    req.user = { userId, fullname, username: uname, headline };

    res.json({ accessToken });
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.userId;

  const { fullname, username, headline, password } = req.body;

  try {
    const existingUser = await User.findOne({
      where: { id: userId },
    });

    if (!userId) return res.status(400).json({ msg: "Id user tidak ada" });

    if (!existingUser) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    const updatedFields = {};
    if (fullname) updatedFields.fullname = fullname;
    if (headline) updatedFields.headline = headline;

    if (username && username !== existingUser.username) {
      const existingUsername = await User.findOne({
        where: { username: username },
      });
      if (existingUsername) {
        return res.status(400).json({ msg: "Username sudah digunakan" });
      }
      updatedFields.username = username;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    await User.update(updatedFields, {
      where: { id: userId },
    });

    const updatedUser = await User.findOne({
      where: { id: userId },
      attributes: ["id", "fullname", "username", "headline", "password"],
    });

    res.json({ status: "Updated", user: updatedUser });
  } catch (error) {
    console.error(error);
  }
};

exports.userLogout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    const isExist = await User.findAll({
      where: { refreshToken },
    });
    if (!isExist) return res.status(403).json({ msg: "Anda belum login" });

    await User.update(
      { refreshToken: null },
      {
        where: {
          refreshToken,
        },
      }
    );

    res.clearCookie("refreshToken");
    res.json({ msg: "Anda telah Logout" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.checkLogin = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      attributes: ["id", "username", "fullname", "headline"],
    });

    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
