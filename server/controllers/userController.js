import crypto from 'crypto';
import fs from 'fs/promises';

import cloudinary from 'cloudinary';

import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import AppError from '../utils/AppError.js';
import User from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';


const cookieOptions = {
    secure: process.env.NODE_ENV === 'development' ? true : false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
};

export const signup = asyncHandler(async (req, res, next) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return next(new AppError('All fields are required', 400));
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return next(new AppError('Email already exists', 409));
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url:
                'https://res.cloudinary.com/du9jzqlpt/image/upload/avatar.png',
        },
    });

    if (!user) {
        return next(
            new AppError('User registration failed, please try again later', 400)
        );
    }
    console.log(req.file);
    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill',
            });
            console.log(result);


            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                fs.rm(`uploads/${req.file.filename}`);
            }
        } catch (error) {
            return next(
                new AppError(error || 'File not uploaded, please try again', 400)
            );
        }
    }

    await user.save();

    const token = await user.generateJWTToken();

    user.password = undefined;

    res.cookie('token', token, cookieOptions);

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user,
    });
});

export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Email and Password are required', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!(user && (await user.comparePassword(password)))) {
        return next(
            new AppError('Email or Password do not match or user does not exist', 401)
        );
    }

    const token = await user.generateJWTToken();

    user.password = undefined;

    res.cookie('token', token, cookieOptions);

    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        user,
    });
});


export const logoutUser = asyncHandler(async (_req, res, _next) => {

    res.cookie('token', null, {
        secure: process.env.NODE_ENV === 'production' ? true : false,
        maxAge: 0,
        httpOnly: true,
    });


    res.status(200).json({
        success: true,
        message: 'User logged out successfully',
    });
});


export const getLoggedInUserDetails = asyncHandler(async (req, res, _next) => {
    const user = await User.findById(req.user.id);
    console.log(user)
    res.status(200).json({
        success: true,
        message: 'User details',
        user,
    });
});


export const forgotPassword = asyncHandler(async (req, res, next) => {

    const { email } = req.body;


    if (!email) {
        return next(new AppError('Email is required', 400));
    }


    const user = await User.findOne({ email });


    if (!user) {
        return next(new AppError('Email not registered', 400));
    }

    const resetToken = await user.generatePasswordResetToken();


    await user.save();


    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;


    const subject = 'Reset Password';
    const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for some reason then copy paste this link in new tab ${resetPasswordUrl}.\n If you have not requested this, kindly ignore.`;

    try {
        await sendEmail(email, subject, message);

        res.status(200).json({
            success: true,
            message: `Reset password token has been sent to ${email} successfully`,
        });
    } catch (error) {
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;

        await user.save();

        return next(
            new AppError(
                error.message || 'Something went wrong, please try again.',
                500
            )
        );
    }
});

export const resetPassword = asyncHandler(async (req, res, next) => {
    const { resetToken } = req.params;

    const { password } = req.body;

    const forgotPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    if (!password) {
        return next(new AppError('Password is required', 400));
    }

    console.log(forgotPasswordToken);

    const user = await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new AppError('Token is invalid or expired, please try again', 400)
        );
    }

    user.password = password;


    user.forgotPasswordExpiry = undefined;
    user.forgotPasswordToken = undefined;

    await user.save();

    res.status(200).json({
        success: true,
        message: 'Password changed successfully',
    });
});


export const changePassword = asyncHandler(async (req, res, next) => {

    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    if (!oldPassword || !newPassword) {
        return next(
            new AppError('Old password and new password are required', 400)
        );
    }

    const user = await User.findById(id).select('+password');

    if (!user) {
        return next(new AppError('Invalid user id or user does not exist', 400));
    }

    const isPasswordValid = await user.comparePassword(oldPassword);

    if (!isPasswordValid) {
        return next(new AppError('Invalid old password', 400));
    }

    user.password = newPassword;

    await user.save();

    user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'Password changed successfully',
    });
});

export const updateUser = asyncHandler(async (req, res, next) => {
    const { fullName } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
        return next(new AppError('Invalid user id or user does not exist'));
    }

    if (fullName) {
        user.fullName = fullName;
    }

    if (req.file) {
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms',
                width: 250,
                height: 250,
                gravity: 'faces',
                crop: 'fill',
            });

            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;

                fs.rm(`uploads/${req.file.filename}`);
            }
        } catch (error) {
            return next(
                new AppError(error || 'File not uploaded, please try again', 400)
            );
        }
    }

    await user.save();

    res.status(200).json({
        success: true,
        message: 'User details updated successfully',
    });
});
