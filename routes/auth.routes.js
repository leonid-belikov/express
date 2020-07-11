const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator')
const User = require('../models/User');
const router = new Router();

router.post('/register',
    [
        check('name')
            .exists({checkFalsy: true}).withMessage('Необходимо указать имя')
            .isAlpha().withMessage('Имя должно состоять из символов латинского алфавита')
            .isLength({min: 3}).withMessage('Минимальная длина имени 3 символа'),

        check('email')
            .exists({checkFalsy: true}).withMessage('Необходимо указать email')
            .isEmail().withMessage('email должен быть корректным'),

        check('password')
            .exists({checkFalsy: true}).withMessage('Необходимо указать пароль')
            .isAlphanumeric().withMessage('Пароль должен состоять из символов латинского алфавита или цифр')
            .isLength({min: 8}).withMessage('Минимальная длина пароля 8 символов'),

        check('confirm')
            .custom((value, { req }) => value === req.body.password).withMessage('Пароли не совпадают'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(422).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации',
                    status: 'wrong data',
                })
            }

            const {name, email, password} = req.body;
            const candidate = await User.findOne({name})
            if (candidate) {
                return res.status(422).json({
                    message: `Имя пользователя "${name}" уже занято`,
                    status: 'name used',
                });
            }

            let hashedPassword;
            try {
                hashedPassword = await bcrypt.hash(password, 12)
            } catch (e){
                console.log('bcrypt error:', e)
            }

            const user = new User({name, email, password: hashedPassword});

            await user.save();

            // TODO: сделать авторизацию по двум токенам
            const token = jwt.sign(
                {userId: user._id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.status(201).json({
                message: `Пользователь ${name} успешно зарегистрирован`,
                status: 'success',
                token,
                user: {
                    name,
                }
            });

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так...'})
        }
    })

router.post('/login',
    [
        check('name')
            .exists({checkFalsy: true}).withMessage('Необходимо указать имя'),
        check('password')
            .exists({checkFalsy: true}).withMessage('Необходимо указать пароль'),
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

            const {name, password} = req.body;
            const user = await User.findOne({name})

            if (!user) {
                return res.status(400).json({message: 'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: 'Неверное сочетание имя/пароль'})
            }

            // TODO: сделать авторизацию по двум токенам
            const token = jwt.sign(
                {userId: user._id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            console.log({
                name,
                homeGroup: user.homeGroup,
            })

            res.json({
                status: 'success',
                token,
                user: {
                    name,
                    homeGroup: user.homeGroup,
                }
            })

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так...'})
        }
    })


module.exports = router;
