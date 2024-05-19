import fs from 'fs/promises';
import path from 'path';

import cloudinary from 'cloudinary';

import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import Community from '../models/communityModel.js';
import AppError from '../utils/AppError.js';

export const getAllCommunities = asyncHandler(async (_req, res, next) => {
    const communities = await Community.find({}).select('-communities');

    res.status(200).json({
        success: true,
        message: 'All communities',
        communities,
    });
});

export const createCommunity = asyncHandler(async (req, res, next) => {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
        return next(new AppError('All fields are required', 400));
    }

    const community = await Community.create({
        title,
        description,
        category,
    });

    if (!community) {
        return next(
            new AppError('Community could not be created, please try again', 400)
        );
    }

    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms',
            });

            if (result) {
                community.thumbnail.public_id = result.public_id;
                community.thumbnail.secure_url = result.secure_url;
            }

            fs.rm(`uploads/${req.file.filename}`);
        } catch (error) {
            for (const file of await fs.readdir('uploads/')) {
                await fs.unlink(path.join('uploads/', file));
            }

            return next(
                new AppError(
                    JSON.stringify(error) || 'File not uploaded, please try again',
                    400
                )
            );
        }
    }

    await community.save();

    res.status(201).json({
        success: true,
        message: 'Community created successfully',
        community,
    });
});

export const getCommunitiesByCommunityId = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const community = await Community.findById(id);

    if (!community) {
        return next(new AppError('Invalid Community id or Community not found.', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Communities fetched successfully',
        communities: community.communities,
    });
});

export const addCommunitiesToCommunityById = asyncHandler(async (req, res, next) => {
    const { title, description } = req.body;
    const { id } = req.params;

    let communitiesData = {};

    if (!title || !description) {
        return next(new AppError('Title and Description are required', 400));
    }

    const community = await Community.findById(id);

    if (!community) {
        return next(new AppError('Invalid community id or community not found.', 400));
    }

    if (req.file) {
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms',
                chunk_size: 50000000, // 50 mb size
                resource_type: 'image',
            });

            if (result) {
                communitiesData.public_id = result.public_id;
                communitiesData.secure_url = result.secure_url;
            }

            fs.rm(`uploads/${req.file.filename}`);
        } catch (error) {
            for (const file of await fs.readdir('uploads/')) {
                await fs.unlink(path.join('uploads/', file));
            }

            return next(
                new AppError(
                    JSON.stringify(error) || 'File not uploaded, please try again',
                    400
                )
            );
        }
    }

    community.communities.push({
        title,
        description,
        communities: communitiesData,
    });

    await community.save();

    res.status(200).json({
        success: true,
        message: 'Community added successfully',
        community,
    });
});

export const removeCommunityFromCommunities = asyncHandler(async (req, res, next) => {
    const { communityId, communitiesId } = req.query;

    console.log(communityId);

    if (!communityId) {
        return next(new AppError('Community ID is required', 400));
    }

    if (!communitiesId) {
        return next(new AppError('Communities ID is required', 400));
    }

    const community = await Community.findById(courseId);

    if (!community) {
        return next(new AppError('Invalid ID or Community does not exist.', 404));
    }

    const communitiesIndex = community.communities.findIndex(
        (communities) => communities._id.toString() === communitiesId.toString()
    );

    if (communitiesIndex === -1) {
        return next(new AppError('Communities does not exist.', 404));
    }

    await cloudinary.v2.uploader.destroy(
        community.communities[communitiesIndex].communities.public_id,
        {
            resource_type: 'video',
        }
    );

    community.communities.splice(communitiesIndex, 1);

    await community.save();

    res.status(200).json({
        success: true,
        message: 'Community lecture removed successfully',
    });
});

export const updateCommunityById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const community = await Community.findByIdAndUpdate(
        id,
        {
            $set: req.body,
        },
        {
            runValidators: true,
        }
    );

    if (!community) {
        return next(new AppError('Invalid Community id or community not found.', 400));
    }

    res.status(200).json({
        success: true,
        message: 'Community updated successfully',
    });
});

export const deleteCommunityById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const community = await Community.findById(id);

    if (!community) {
        return next(new AppError('Community with given id does not exist.', 404));
    }

    // await community.remove(); // It doesnot work
    await community.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Community deleted successfully',
    });
});
