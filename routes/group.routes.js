const {Router} = require('express');
const Group = require('../models/Group');
const auth = require('../middleware/auth.middleware')
const router = new Router();


router.get('/show', auth, async (req, res) => {
    try {
        const userId = req.userId;
        const groups = await Group.find({
            users: { $elemMatch: { $eq: userId } }
        })
            .populate('users', 'name')
            .populate('invited', 'name')
        if (!groups.length) return res.json({message: 'Группы не найдены'})
        return res.json({groups})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Что-то пошло не так...'})
    }
})


router.post('/add', auth, async (req, res) => {
    try {
        const {name, description, invited, accounts} = req.body;
        const userId = req.userId;
        const users = [userId]
        const group = new Group({
            name,
            description,
            users,
            invited,
            accounts,
        });
        await group.save();
        res.send(group)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'})
    }
});

router.get('/invitations', auth, async (req, res) => {
    try {
        const userId = req.userId;
        const invitations = await Group.find({
            invited: { $elemMatch: { $eq: userId } }
        })
            .populate('users', 'name')
        if (!invitations.length) return res.json({message: 'Группы не найдены'})
        return res.json({invitations})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Что-то пошло не так...'})
    }
})


module.exports = router;
