const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema.js");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

const PORT = process.env.PORT || 4000;

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ygo-xbsf5.mongodb.net/test?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    })
    .catch((error) => {
        console.error(error);
    });
