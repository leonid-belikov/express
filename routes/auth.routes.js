const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator')
const User = require('../models/User');
const router = new Router();

router.post('register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('name', 'Минимальная длина имени 3 символа').isLength({min: 3}),
        check('password', 'Минимальная длина пароля 8 символов').isLength({min: 8})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            const {name, email, password} = req;
            const candidate = await User.findOne({name})
            if (candidate) {
                return res.status(422).json({message: 'Выбранное имя пользователя уже занято'});
            }

            const hashedPassword = await bcrypt.hash(password, 45)
            const user = new User({name, email, password: hashedPassword});

            await user.save();
            res.status(201).json({message: `Пользователь ${name} зарегистрирован`});

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так...'})
        }
    })

router.post('login',
    [
        check('email', 'Некорректный email').normalizeEmail().isEmail(),
        check('name', 'Некорректное имя').exists(),
        check('password', 'Некорректный пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему'
                })
            }

            const {name, password} = req;
            const user = await User.findOne({name})

            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Неверное сочетание имя/пароль'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так...'})
        }
    })

module.exports = router;