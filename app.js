const express = require('express');
const router = require('./routes/head.js');
const mongoose = require('mongoose');

const app = express();
const uri = "mongodb+srv://muahmad710:L1OFLoq8iXKxkfni@cluster0.w40er2l.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error", err);
});

const PORT = 8080;

app.listen(PORT, async (error) => {
    if (!error)
        console.log("Server is Successfully Running on " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);

const userRouter = require('./routes/user.js');
const pizzaRouter = require('./routes/pizza.js');
const cartRouter = require('./routes/cart.js');

app.use(express.json())
app.use('/head', router);
app.use('/user', userRouter);
app.use('/pizza', pizzaRouter);
app.use('/cart', cartRouter);
