
module.exports = async (req, res, next) => {
  try {
    if (!req.body.headers.authorization) throw "Forbidden!!";
    const category = req.body.headers.authorization.split(" ")[1];
    if(category==="Admin")
    {
      next();
    }
    else
      throw "not authorized!";
  } catch (err) {
    res.status(401).json({
      message: "Forbidden 🚫🚫🚫",
    });
  }
};
