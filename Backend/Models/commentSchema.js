const mongoose= require("mongoose")

const commentsSchema= new mongoose.Schema({
    taskId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    text: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

const Comments= mongoose.model("Comments", commentsSchema);
module.exports= Comments;