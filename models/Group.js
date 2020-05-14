const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    description: String,
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    invited: [{type: Schema.Types.ObjectId, ref: 'User'}],
    accounts: [{
        name: {type: String, required: true},
    }],
});

module.exports = model('Group', schema);
