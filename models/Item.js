const { Schema, model } = require('./connection');

const itemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    }
},
{
    timestamps: true
})

const Item = model('Item', itemSchema);

module.exports = Item;