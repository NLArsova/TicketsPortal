const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  endDate: { type: String, required: true },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
