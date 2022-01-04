const express = require("express");
const router = express.Router();


const Contest = require("../models/contest.model")


router.post("/", async (req, res) => {
    const c = await Contest.create(req.body);
    const contest = await Contest.find().lean().exec();
    return res.status(201).send({contest});
})


router.get("/", async (req, res) => {
    const contest = await Contest.find().lean().exec();
    return res.status(200).send({contest});
})

router.delete("/:id", async (req, res) => {
    const contest  = await Contest.findByIdAndDelete(req.params.id).lean().exec(); 
    return res.status(204).send({contest})
})

router.get("/sortByDeadline", async (req, res) => {
    const contest = await Contest.find().sort({deadline : 1}).lean().exec();
    return res.status(200).send({contest})
})

router.get("/type/dsa", async (req, res) => {
    const contest = await Contest.find({type : "dsa"}).lean().exec();
    return res.status(200).send({contest})
})

router.get("/type/coding", async (req, res) => {
    const contest = await Contest.find({type: "coding"}).lean().exec();
    return res.status(200).send({contest})
})

module.exports = router;