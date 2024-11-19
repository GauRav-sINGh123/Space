import mongoose, {Schema, model,Document, Model} from 'mongoose';

export interface Message extends Document {
    content: string;
    createdAt: Date;  
}

const MessageSchema:Schema<Message>=new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    isVerified:boolean;
    verifyCodeExpiry: Date;
    isAcceptionMessage:boolean;
    message:Message[]
}

const UserSchema:Schema<User>=new Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    verifyCode: {
        type: String,
        required: [true, 'Please provide a verifyCode'],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Please provide a verify Code Expiry'],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptionMessage: {
        type: Boolean,
        default: true
    },
    message: [MessageSchema]
})

const UserModel=(mongoose.models.User as Model<User>) || model<User>('User', UserSchema);

export default UserModel