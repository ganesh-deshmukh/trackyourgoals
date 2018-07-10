// model defines schema(table) as Mongodb is schemaless.
// this is schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalsSchema = new Schema({
    title:{
        type:String,
        required:true,  
    },
    details:{
        type:String,
        required:true,
    },
    user:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,// current date
    }
});

//mongoose.model('modelName', SchemaName);
mongoose.model('goals',GoalsSchema);

// in app.js ,
// const Goal = mongoose.model('modelName');