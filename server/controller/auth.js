const Users = require("../models/Client");
const jwt = require("jsonwebtoken");

const handleUserLogin = async (req, res) => {
  try {
    // validate the user data

    const { email } = req.body;

    // check if account exist.
    let user = await Users.findOne({ email });

    // send a failed request
    if (!user)
      return res
        .status(403)
        .json({ status: "error", message: "User does not exist." });

    // change password hash

    console.log(user.password);
    ///check if user still has default password and perfrom the action

    if (user.password !== req.body.password)
      return res
        .status(401)
        .json({ status: "error", message: "Wrong password or username!" });

    // generate admin token
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "500d" }
    );

    // append token to the request header
    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};

exports.handleUserLogin = handleUserLogin;
