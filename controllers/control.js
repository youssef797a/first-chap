const task = require("../model/taskmodel")
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.posttask = async(req, res) => {
    try {
        const newConst = new task(req.body)
        if(!req.body.name){
            res.status(400).send({message: "name is required"})
        }
        if(!req.body.email){
            res.status(400).send({message: "email is required"})
        }

        res.status(201).send({message: "contact created", task: newtask})
    } catch (error) {
        res.status(500).send({message: "server error"})
        console.log(error);
    }
   
    newtask.save()

}
exports.getALLtasks = async (req, res) => {
    try {
        
        return res.status(200).json({ success: true, message: 'Success message' });
    } catch (error) {
        console.error(error);
        // Send an error response and return to exit the function
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

exports.getoncetasks = async (req, res) =>{
    try {
        const task = await task.find()
        res.status(200).send({message: "getting all tasks", response: newtask})
    } catch (error) {
        res.status(500).send({message: "server error"})
        console.log(error);
    }
}
exports.deletetasks = async (req, res) =>{
    try {
       await task.deleteOne({_id: req.parms.id})
        res.status(200).send({message: "task delete" })
    } catch (error) {
        res.status(500).send({message: "server error"})
        console.log(error);
    }
}

exports.updatetasks= async (req, res) =>{
    try {
       const result = await task.findByIdAndUpdate({_id: req.parms.id}, {$set: {...req.body}}, {new: true})
        res.status(200).send({message: "task update", response: result})
        if (result) {
            const newResult = await task.findOne({_id: req.parms.id})
            res.status(200).send({message: "task updated", response: newResult})
        } else {
            res.status(404).send({ message:"there is task whit this id"})
        }
    } catch (error) {
        res.status(500).send({message: "server error"})
        console.log(error);
    }
}
