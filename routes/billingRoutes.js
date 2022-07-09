const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "INR",
      description: "$5 for 5 credits",
      source: req.body.id,
    });

    const customer = await stripe.customers.create({
      name: "Emaily",
      address: {
        line1: "Unknown",
        postal_code: "151001",
        city: "Bathinda",
        state: "Punjab",
        country: "IN",
      },
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
