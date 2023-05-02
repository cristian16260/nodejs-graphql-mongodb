import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({
  path: "./.env",
});

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    try {
      const verified = jwt.verify(token, "secret");
      req.verifieluser = verified.user;
      next();
    } catch (error) {
      // console.log(error)
      next();
    }
  } catch (error) {
    res.status(401).json({
      message: "authorization denied",
    });
  }
};
