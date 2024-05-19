import { Router } from 'express';

import {
    authorizeRoles,
    authorizedSubscribers,
    isLoggedIn
} from '../middlewares/authMiddleware.js';
import {
    addCommunitiesToCommunityById,
    createCommunity,
    deleteCommunityById,
    getAllCommunities,
    getCommunitiesByCommunityId,
    removeCommunityFromCommunities,
    updateCommunityById,
} from '../controllers/communityController.js';
import upload from '../middlewares/multerMiddleware.js';
// import { updateCommunity } from '../../client/src/Redux/communitySlice.js';

const router = Router();

router
    .route('/')
    .get(getAllCommunities)
    .post(
        isLoggedIn,
        authorizeRoles('ADMIN'),
        upload.single('thumbnail'),
        createCommunity
    )
    .delete(isLoggedIn, authorizeRoles('ADMIN'), removeCommunityFromCommunities)
router
    .route('/:Id')
    .get(isLoggedIn, authorizedSubscribers, getCommunitiesByCommunityId)
    .post(
        isLoggedIn,
        authorizeRoles('ADMIN'),
        upload.single('communities'),
        addCommunitiesToCommunityById
    )
    .put(isLoggedIn, authorizeRoles('ADMIN'), updateCommunityById)
    .delete(isLoggedIn, authorizeRoles('ADMIN'), deleteCommunityById)
// .delete(isLoggedIn, exitCommunity)



export default router;