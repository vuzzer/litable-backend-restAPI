import mongoose from "mongoose";
const {Schema} = mongoose;

const clientSchema = new Schema({
    username: String,
    email: String,
    password: String,
    photo: String,
    role: String
})

export default mongoose.model("Client", clientSchema);