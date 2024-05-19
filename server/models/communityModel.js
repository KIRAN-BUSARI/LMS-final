import { model, Schema } from 'mongoose';

const communitySchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            minlength: [8, 'Title must be atleast 8 characters'],
            maxlength: [50, 'Title cannot be more than 50 characters'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minlength: [20, 'Description must be atleast 20 characters long'],
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
        },
        thumbnail: {
            public_id: {
                type: String,
            },
            secure_url: {
                type: String,
            },
        },
    },
    {
        timestamps: true,
    }
);

const Community = model('Community', communitySchema);

export default Community;