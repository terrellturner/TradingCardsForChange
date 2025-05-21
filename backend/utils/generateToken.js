import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId: userId._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  //Save JWT as HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  console.info("Cookie saved.");
};

const generateResetToken = (res, userId) => {
  const token = jwt.sign({ userId: userId._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  //Save JWT as HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  console.info("Cookie saved.");
};

export default generateToken;
