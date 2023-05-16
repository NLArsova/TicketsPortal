const express = require("express");
const mongoose = require("mongoose");
const Ticket = require("./models/ticketModel");
const app = express();

app.use(express.json());

//Fetch a ticket from the database
app.get("/tickets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fetchTicket = await Ticket.findById(id);
    res.status(200).json(fetchTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Fetch all tickets from the database
app.get("/tickets", async (req, res) => {
  try {
    const fetchAllTickets = await Ticket.find({});
    res.status(200).json(fetchAllTickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a ticket to the database
app.post("/ticket", async (req, res) => {
  try {
    const createTicket = await Ticket.create(req.body);
    res.status(200).json(createTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update a ticket from the database
app.put("/tickets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findTicket = await Ticket.findByIdAndUpdate(id, req.body);

    if (!findTicket) {
      return res
        .status(404)
        .json({ message: `Cannot find any ticket with ID ${id}` });
    }

    const updateTicket = await Ticket.findById(id);
    res.status(200).json(updateTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete a product from the database
app.delete("/tickets/:id", async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);

    if (!deletedTicket) {
      return res
        .status(404)
        .json({ message: `Cannot delete any ticket with ID ${id}` });
    }

    res.send(deletedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Connection to the database (MongoDB)
mongoose
  .connect(
    "mongodb+srv://sieroteev:admin123456@cluster0.ecf7cs4.mongodb.net/Node-Tickets-API?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Node ticket API app is running on port 3000");
    });
  })
  .catch(() =>
    console.log("Something is wrongg with the connection...Try again!")
  );
