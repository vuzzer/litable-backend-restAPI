"use strict";
require("dotenv").config({ path: __dirname + "/config/.env" });
const jwt = require("jsonwebtoken");
const Client = require("../models/client");


function generateJWT(payload){
    return jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET )
}

exports.register = async (req, res, next) => {
  // Data Json of client
  const data = req.body;

  try {
    // Get user that uid
    let user = await Client.find({ uid: data.uid });

    // Check if user exist
    if (user.length == 0) {
        const client = new Client({
          uid: data.uid,
          username: data.username,
          email: data.email,
          role: "User",
          photo: "No picture",
        });

        // Save client
        user = await client.save();

        // Generate token
        let token = generateJWT(user);

        // Response server
        res.status(201).json({ message: "litable created successful", token: token });

    } else {
      // Object client
      let token = generateJWT(user[0]);

      // Response server
      res
      .status(200)
      .json({ message: "Log User", token: token });
    }
  } catch (e) {
    console.log(e)
    const error = new Error("Error occured")
    next(error)
  }
};


