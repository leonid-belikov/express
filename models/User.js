const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    homeGroup: {type: Schema.Types.ObjectId, ref: 'Group'},
});

module.exports = model('User', schema);
