import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required:true },
    lastName: { type: String, required:true },
    email: { type: String, required:true, unique: true },
    age: { type: Number, required:true },
    password: { type:String, required:true, index:true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'carts', default: [] }],
    role: { type:String, default:'user' },
    githubUser: { type: Boolean, required:true, default:false },
    prodCreator: { type: Boolean, default: false }
});

UserSchema.pre('find', function(){
    this.populate('carts')
});

export const UserModel = (
    'users',
    UserSchema
);