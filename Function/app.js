const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_SECRET_KEY);

//APP CONFIG
const app = express();

//MIDDLEWARES
app.use(cors());
app.use(express.json());

//API ROUTES
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/api/payment_intents", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "aud",
    });

    res.status(200).send(paymentIntent.client_secret);
    console.log("payment success");
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
});

const port = process.env.PORT || 4242;
app.listen(port, () => console.log(`Server is running on port ${port}`));
