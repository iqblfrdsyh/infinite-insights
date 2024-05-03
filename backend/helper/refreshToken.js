const { User } = require("./relation");
const jwt = require("jsonwebtoken");

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await User.findAll({
      where: {
        refreshToken,
      },
    });
    if (!user || user.length === 0) return res.sendStatus(403);
    jwt.verify(
      refreshToken,
      process.env.SECRET_REFRESH_TOKEN,
      (err, decode) => {
        if (err) return res.sendStatus(403);
        const userId = user[0].id;
        const fullname = user[0].fullname;
        const username = user[0].username;
        const headline = user[0].headline;
        const accessToken = jwt.sign(
          { userId, fullname, username, headline },
          process.env.SECRET_ACCESS_TOKEN,
          {
            expiresIn: "15s",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
