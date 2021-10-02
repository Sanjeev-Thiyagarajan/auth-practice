var jwt = require("jsonwebtoken");
const { promisify } = require("util");
const config = require("../config");
const User = require("../models/userModel");

exports.protect = async (req, res, next) => {
  try {
    //         console.log(req.headers)
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // const token = req.cookies.token

    if (!token) {
      return res.status(401).json({
        message: "not authorized",
      });
    }
    const decoded = await promisify(jwt.verify)(
      token,
      config.ACCESS_JWT_SECRET
    );
    const user = await User.findById(decoded.id);
    req.user = user;
  } catch (err) {
    return res.status(401).json({ error: err });
  }

  next();
};
