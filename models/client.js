const mongoose = require("mongoose");
const {Schema} = mongoose;

const clientSchema = new Schema({
    uid: {
        type: String,
        unique: true
    },
    username: String,
    email: String,
    password: String,
    photo: String,
    role: String
})

module.exports = mongoose.model("Client", clientSchema);