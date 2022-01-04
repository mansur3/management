const express = require("express");
const app = express();
const router = express.Router();



const Student = require("../models/student.model");


router.post("/", async (req, res) => {
    const c = await Student.create(req.body);
    const student = await Student.find().lean().exec();
    return res.status(201).send({student});
})

router.get("/", async (req, res) => {
    const student = await Student.find().lean().exec();
    return res.status(200).send({student});
})

router.get("/age", async(req, res) => {
    const student = await Student.find().sort({age : 1}).lean().exec();
    return res.status(200).send({student});
})

router.get("/name", async (req, res) => {
    const student = await Student.find().sort({name : 1}).lean().exec();
    return res.status(200).send({student});
})



//delete operation

router.delete("/:id", async (req, res) => {
    const d = await Student.findByIdAndDelete( req.params.id).lean().exec();
    const student = await Student.find().lean().exec();
    return res.status(204).send({student});
})

module.exports = router;