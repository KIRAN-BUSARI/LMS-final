import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import User from '../models/userModel.js';
import AppError from '../utils/AppError.js';
import sendEmail from '../utils/sendEmail.js';

export const contactUs = asyncHandler(async (req, res, next) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return next(new AppError('Name, Email, Message are required'));
    }

    try {
        const subject = 'Contact Us Form';
        const textMessage = `${name} - ${email} <br /> ${message}`;

        await sendEmail(process.env.SMTP_FROM_EMAIL, subject, textMessage);
    } catch (error) {
        console.log(error);
        return next(new AppError(error.message, 400));
    }

    res.status(200).json({
        success: true,
        message: 'Your request has been submitted successfully',
    });
});

export const userStats = asyncHandler(async (req, res, next) => {
    const allUsersCount = await User.countDocuments();

    const subscribedUsersCount = await User.countDocuments({
        'subscription.status': 'active',
    });

    res.status(200).json({
        success: true,
        message: 'All registered users count',
        allUsersCount,
        subscribedUsersCount,
    });
});