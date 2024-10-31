const express= require("express")
const Checklist= require("../Models/checklistSchema.js")
const verifyToken = require('../Middleware/verifyUser')
const Task= require('../Models/tasksSchema.js')


const router= express.Router()

router.post("/user/:taskId/checklist/create", verifyToken, async(req, res)=>{
    try
    {
        const taskId= req.params.taskId
        const item= await Task.findById(taskId)
        if(!item)
            return res.status(404).json({success:false, msg:"task not found"})


        const checklist= await Checklist.findOne({taskId: taskId, name:req.body.name})
        if(checklist)
            return res.status(400).json({success:false, err:"Give a unique name for the checklist item"})

        const newItem= await Checklist.create({
            taskId:taskId, 
            name:req.body.name,
            status: req.body.status,
            rank:req.body.rank
        })
        if(newItem)
            return res.status(201).json({success:true, msg:"new checklist item created", newItem})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err})
    }
})


router.get("/user/:taskId/checklist/get", verifyToken, async(req, res)=>{
    try
    {
        const getListItems= await Checklist.find({taskId: req.params.taskId})
        if(getListItems)
            return res.status(200).json({success:true, msg:"all checlist items retrieved successfully", getListItems})
        else
            return 

    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err})
    }
})

router.patch('/user/:taskId/checklist/update/:listId', verifyToken, async(req, res)=>{
    try
    {
        const listId= req.params.listId
        const item= await Checklist.findById(listId)
        if(!item)
            return res.status(404).json({success:false, msg:"task not found"})

        const updateItem={}
        if(req.body.rank)
            updateItem.rank=req.body.rank
        if(req.body.status)
            updateItem.status=req.body.status
        if(req.body.name)
            updateItem.name=req.body.name
        const updatedItem= await Checklist.findByIdAndUpdate(listId, {$set:updateItem}, { new: true })

        if(updatedItem)
            return res.status(200).json({success:true, msg:"checkList item updated", updatedItem})

    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err})
    }
})

router.delete('/user/:taskId/checklist/delete/:listId', verifyToken, async(req, res)=>{
    try
    {
        const deletedItem= await Checklist.findByIdAndDelete(req.params.listId)
        if(deletedItem)
            return res.status(204).json({success:true, msg:"checklist item deleted successfully", deletedItem})
    }
    catch(err)
    {
        return res.status(500).json({success:false, error:err})
    }
})

module.exports= router
