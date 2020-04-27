const {Router} = require('express');
const User = require('../models/User');
const router = new Router();


router.post('/show', async (req, res) => {
    const {name} = req.body;
    const user = await User.findOne({name})

    if (!user) {
        return res.status(422).json({
            message: `Пользователь "${name}" не найден`,
            status: 'user not found',
        });
    }

    return res.json({
        user: {
            id: user._id,
            name: user.name,
        }
    })
})


module.exports = router;
