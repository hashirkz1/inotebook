const jwt = require("jsonwebtoken");
const JWT_SECRET = "Hashirisagoodb@$oy";

const fetchuser = (req, res, next) => {
    // get the user from jwt token and add it to req obj
    const token = req.header("auth-token");
    if (!token) {
      res.status(401).json({ error: "Please use a valid token" });
    } else {
        try {
     // agr ye verify ni hota to code yaha se hi wapis catch block m chla jata h neeche ni jata
      const token_verification = jwt.verify(token, JWT_SECRET);
      // ye if k koi kam ni hm isko hata den to bhi koi issue ni 
      if (!token_verification) {
        req.status(401).json({ error: "Please use a valid token" });
      } else {
        req.user = token_verification.user;
        next();
      }
    }
    catch (error) {
        // console.log(error)
        res.status(401).json({ error: "Please use a valid token" });
    }}
};

module.exports = fetchuser;
