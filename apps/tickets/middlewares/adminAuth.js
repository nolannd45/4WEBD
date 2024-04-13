const adminAuth = (req, res, next) => {
  const auth = req.user.role;
  if (auth === "admin") {
    next();
  } else {
    res.status(401).send('vous ne disposez pas d\'un role pouvant executer cette action');
  }
};

export default adminAuth;
