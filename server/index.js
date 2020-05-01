const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect('mongodb://127.0.0.1:27017/gql-ninja',{useNewUrlParser: true});
mongoose.connection.once('open',()=>{
   console.log('conneceted to database')
})

app.use(cors())
app.use('/graphql',graphqlHTTP({
    schema : schema,
    graphiql :  true

}))

app.listen(4000,()=>{
    console.log("Server running on port 4000")
})