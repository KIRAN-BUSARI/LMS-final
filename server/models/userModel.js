import crypto from 'crypto';

import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Name is required'],
            minlength: [5, 'Name must be at least 5 characters'],
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please fill in a valid email address',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters'],
            select: false,
        },
        subscription: {
            id: String,
            status: String,
        },
        avatar: {
            public_id: {
                type: String,
            },
            secure_url: {
                type: String,
            },
        },
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER',
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {

    comparePassword: async function (plainPassword) {
        return await bcrypt.compare(plainPassword, this.password);
    },


    generateJWTToken: async function () {
        return await jwt.sign(
            { id: this._id, role: this.role, subscription: this.subscription },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        );
    },

    generatePasswordResetToken: async function () {

        const resetToken = crypto.randomBytes(20).toString('hex');


        this.forgotPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;

        return resetToken;
    },
};

const User = model('User', userSchema);

export default User;
