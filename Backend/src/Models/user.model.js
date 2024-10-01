import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema= new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
      },
      phoneNumber: {
        type: String,
        required:  function() {
          return !this.googleId;
        },
        unique: true,
        minlength: 10,
        maxlength: 15
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },
      password: {
        type: String,
        required: function() {
          // Password is required only for non-Google users
          return !this.googleId;
        },
        minlength: 6
      },
      userType: {
        type: String,
        enum: ['Buyer', 'Seller', 'Admin'],
        required: true,
        default: 'Buyer'
      },
      googleId: {
        type: String,
        unique: true,
        sparse: true // Optional, because not all users will have a Google ID
      },
      avatar: {
        type: String, // Google profile picture or user-uploaded picture
      }
},{timestamps:true});

// Before saving user we will check if password is modified
userSchema.pre('save', async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

 // This method will verify the Password of the user
 userSchema.methods.isPasswordCorrect = async function (pass) {
    return await bcrypt.compare(pass, this.password);
}

export const User =mongoose.model("User",userSchema);



