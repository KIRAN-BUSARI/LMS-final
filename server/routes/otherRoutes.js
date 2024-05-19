import { Router } from 'express';
import {
    contactUs,
    userStats,
} from '../controllers/otherController.js';
import { authorizeRoles, isLoggedIn } from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/contact').post(contactUs);
router
    .route('/admin/stats/users')
    .get(isLoggedIn, authorizeRoles('ADMIN'), userStats);

export default router;