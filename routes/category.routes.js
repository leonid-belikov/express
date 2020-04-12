const {Router} = require('express');
const Category = require('../models/Category');
const router = new Router();


router.get('/show', async (req, res) => {
    try {
        const data = await Category.find();
        console.log(data);
        if (!data || data.length === 0) {
            res.send({})
        } else {
            res.send(data);
        }
    } catch(e) {
        res.status(500).json({message: 'Что-то пошло не так...'})
    }

});

router.post('/add', async (req, res) => {
    try {
        console.log(req.body)
        const name = req.body.name;
        const category = new Category({ name });
        await category.save();
        res.send(category)
    } catch(e) {
        res.status(500).json({message: 'Что-то пошло не так...'})
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const id = req.body.id;
        const deletedCategory = await Category.findOneAndDelete({ _id: id });
        res.send(deletedCategory)
    } catch(e) {
        res.status(500).json({message: 'Что-то пошло не так...'})
    }
});

router.put('/update', async (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        await Category.findOneAndUpdate({_id: id}, {name});
        const updatedCategory = await Category.findOne({ _id: id });
            res.send(updatedCategory);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'})
    }
});

module.exports = router;