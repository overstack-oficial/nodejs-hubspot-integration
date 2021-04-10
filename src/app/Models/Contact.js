const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Contact = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
},
{
    timestamps: true,
});

Contact.plugin(mongoosePaginate);

module.exports = mongoose.model("Contact", Contact);

