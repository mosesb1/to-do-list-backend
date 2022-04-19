const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', (req,res) => {
    Item.find({}, (err, foundItems) => {
        if(!err){
            res.status(200).json(foundItems);
        } else {
            res.status(400).json(err);
        }
    })
})

router.get('/table', (req,res) => {
    Item.find({}, (err, foundItems) => {
        if(!err){
            const formattedData = foundItems.reduce((acc,item) => {
                acc[item.completed] = acc[item.completed] ? [...acc[item.completed],item] : [item]
                return acc
            },{})
            res.status(200).json(formattedData);
        } else {
            res.status(400).json(err);
        }
    })
})

router.post('/', (req,res) => {
    const {body} = req;

    Item.create(body, (err, createdItem) => {
        if(!err){
            res.status(200).json(createdItem);
        } else {
            res.status(400).json(err);
        }
    })
})

router.delete('/:id', (req,res) => {
    Item.findByIdAndDelete(req.params.id, (err, deletedItem) => {
        if(err) {
            res.status(400).json(err)
        } else {
            res.status(200).json({message: "deleted item"})
        }
    })
})

router.put('/:id', (req,res) => {
    const {body} = req;

    Item.findByIdAndUpdate(req.params.id, body, {new: true}, (err, updatedItem) => {
        if(!err){
            res.status(200).json(updatedItem);
        } else {
            res.status(400).json(err)
        }
    })
})

module.exports = router;