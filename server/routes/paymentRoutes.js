import { Router } from 'express';
import {
    getRazorpayApiKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    allPayments,
} from '../controllers/paymentController.js';
import {
    authorizeRoles,
    authorizedSubscribers,
    isLoggedIn,
} from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/subscribe').post(isLoggedIn, buySubscription);
router.route('/verify').post(isLoggedIn, verifySubscription);
router
    .route('/unsubscribe')
    .post(isLoggedIn, authorizedSubscribers, cancelSubscription);
router.route('/razorpay-key').get(isLoggedIn, getRazorpayApiKey);
router.route('/').get(isLoggedIn, authorizeRoles('ADMIN'), allPayments);

export default router;