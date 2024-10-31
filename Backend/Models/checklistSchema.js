const mongoose= require('mongoose')

const checklistSchema= new mongoose.Schema({
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    name:{
        type:String,
        required: true
    },
    status:{
        type:String, 
        required:true,
    }, 
    rank:{
        type:Number,
    }
})

const Checklist= mongoose.model("CheckLists", checklistSchema)
module.exports= Checklist;