const userAuth = (req, res, next) => {
  const auth = req.user.role;
  if (auth === "user") {
    next();
  } else {
    res.sendStatus(401);
  }
};

export default userAuth;
