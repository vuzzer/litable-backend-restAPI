const mongoose = require("mongoose")
const {Schema} = mongoose;


const litableSchema = new Schema({
    city: String,
    street: String,
    rent: Number,
    createAt:{type: Date, default: Date.now()},
    imageUrl: Array,
    clients: {type: Schema.Types.ObjectId, ref: 'Client'} // on client has many property
})  

module.exports = mongoose.model("Litable", litableSchema);  