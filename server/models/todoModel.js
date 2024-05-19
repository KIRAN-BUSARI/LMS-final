import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    // priority: {
    //     type: String,
    //     enum: ['low', 'medium', 'high'], // Adding priority field with predefined values
    //     default: 'medium'
    // },
    // dueDate: {
    //     type: Date,
    //     required: true
    // }
});

export const Todo = mongoose.model('Todo', todoSchema);
