import { Router } from 'express';
import {
    addLectureToCourseById,
    createCourse,
    deleteCourseById,
    getAllCourses,
    getLecturesByCourseId,
    removeLectureFromCourse,
    updateCourseById,
} from '../controllers/courseController.js';

import {
    authorizeRoles,
    authorizedSubscribers,
    isLoggedIn,
} from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';

const router = Router();

router
    .route('/')
    .get(getAllCourses)
    .post(
        isLoggedIn,
        authorizeRoles('ADMIN'),
        upload.single('thumbnail'),
        createCourse
    )
    .delete(isLoggedIn, authorizeRoles('ADMIN'), removeLectureFromCourse);

router
    .route('/:id')
    .get(isLoggedIn, authorizedSubscribers, getLecturesByCourseId)
    .post(
        isLoggedIn,
        authorizeRoles('ADMIN'),
        upload.single('lecture'),
        addLectureToCourseById
    )
    .put(isLoggedIn, authorizeRoles('ADMIN'), updateCourseById)
    .delete(isLoggedIn, authorizeRoles('ADMIN'), deleteCourseById)

export default router;
