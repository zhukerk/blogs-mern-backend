import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { controllersErrorLogger, ApiError } from '../utils/index.js';
import { UserModel } from '../db/models/index.js';

export const userController = {
    controllerKey: 'User',

    async register(req, res) {
        try {
            const password = req.body.password;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const doc = new UserModel({
                email: req.body.email,
                login: req.body.login,
                passwordHash: hash,
            });

            const user = await doc.save();

            const token = jwt.sign(
                {
                    _id: user._id,
                },
                process.env.SECRET_KEY,
                {
                    expiresIn: '30d',
                }
            );

            const { passwordHash, ...userData } = user._doc;

            res.json({
                ...userData,
                token,
            });
        } catch (err) {
            controllersErrorLogger(this.controllerKey, 'register', err);

            next(ApiError.internal('Failed to register'));
        }
    },

    async login(req, res) {
        try {
            const user = await UserModel.findOne({ email: req.body.email });

            if (!user) {
                next(ApiError.badRequest('Invalid email or password'));
            }

            const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

            if (!isValidPass) {
                next(ApiError.badRequest('Invalid email or password'));
            }

            const token = jwt.sign(
                {
                    _id: user._id,
                },
                process.env.SECRET_KEY,
                {
                    expiresIn: '30d',
                }
            );

            const { passwordHash, ...userData } = user._doc;

            res.json({
                ...userData,
                token,
            });
        } catch (err) {
            controllersErrorLogger(this.controllerKey, 'login', err);

            next(ApiError.internal('Failed to login'));
        }
    },

    async getMe(req, res) {
        try {
            const user = await UserModel.findById(req.userId);

            if (!user) {
                return next(ApiError.notFound('User not found'));
            }

            const { passwordHash, ...userData } = user._doc;

            res.json(userData);
        } catch (err) {
            controllersErrorLogger(this.controllerKey, 'getMe', err);

            next(ApiError.internal('No access'));
        }
    },
};
