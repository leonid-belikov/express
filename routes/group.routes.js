const {Router} = require('express');
const Group = require('../models/Group');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware')
const router = new Router();


const findGroupsByUser = async userId => await Group.find({
        users: { $elemMatch: { $eq: userId } }
    })
        .populate('users', 'name')
        .populate('invited', 'name')


const findInvitationsByUser = async userId => await Group.find({
    invited: { $elemMatch: { $eq: userId } }
})
    .populate('users', 'name')


router.get('/show', auth, async (req, res) => {
    try {
        const userId = req.userId;
        const groups = await findGroupsByUser(userId)
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
        const candidate = await Group.findOne(
            {
                $and: [
                    {name},
                    {
                        $or: [
                            {users: { $elemMatch: { $eq: userId } } },
                            {invited: { $elemMatch: { $eq: userId } } },
                        ]
                    }
                ]
            }
        )
        if (candidate) {
            return res.status(422).json({message: 'Выбранное имя группы уже занято'})
        }
        const users = [userId]
        const group = new Group({
            name,
            description,
            users,
            invited,
            accounts,
        });
        await group.save()

        // Если у юзера нет домашней группы, то присвоим
        const userModel = await User.findOne({_id: userId})
        const userHomeGroup = userModel.homeGroup
        if (!userHomeGroup) {
            const group = await Group.findOne({name})
            await User.findOneAndUpdate(
                {_id: userId},
                {$set: {homeGroup: group._id}}
            )
        }
        res.send(group)
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так...'})
    }
});


router.get('/invitations', auth, async (req, res) => {
    try {
        const userId = req.userId;
        const invitations = await findInvitationsByUser(userId)
        if (!invitations.length) return res.json({message: 'Группы не найдены'})
        return res.json({invitations})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Что-то пошло не так...'})
    }
})


router.post('/invitations', auth, async (req, res) => {
    try {
        const userId = req.userId
        const {groupId, accepted} = req.body
        const update = {
            $pull: {invited: userId},
        }
        if (accepted) {
            update.$push = {users: userId}
        }
        await Group.findOneAndUpdate(
            {_id: groupId},
            update,
            {
                new: true
            }
        )
        const invitations = await findInvitationsByUser(userId)
        let groups = null
        if (accepted) {
            groups = await findGroupsByUser(userId)
        }
        return res.json({
            groups,
            invitations,
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Что-то пошло не так...'})
    }
})


module.exports = router;
