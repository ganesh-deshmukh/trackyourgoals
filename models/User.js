// model defines schema(table) as Mongodb is schemaless.
// this is schema

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,  
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,// current date
    }
});

//mongoose.model('modelName', SchemaName);
mongoose.model('users',UserSchema);

// in app.js ,
// const Goal = mongoose.model('modelName');