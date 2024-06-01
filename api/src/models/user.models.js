import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters"], // Corrected property name
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    aboutMe: {
      type: String,
      required: [true, "About me is required"],
    },
    avatar: {
      public_id: {
        type: String,
        required: [true, "Avatar is required"],
      },
      url: {
        type: String,
        required: [true, "Avatar Url is required"],
      },
    },
    resume: {
      public_id: {
        type: String,
        required: [true, "Resume is required"],
      },
      url: {
        type: String,
        required: [true, "Resume Url is required"],
      },
    },
    portfolioUrl: {
      type: String,
      required: [true, "Portfolio Url is required"],
    },
    githubUrl: {
      type: String,
    },
    linkedinUrl: {
      type: String,
    },
    twitterUrl: {
      type: String,
    },
    facebookUrl: {
      type: String,
    },
    instagramUrl: {
      type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// Encrypt Password before save
userSchema.pre("save", async function (next) {
  // if password is not modified
  if (!this.isModified("password")) return next();

  // if there any modification inside password field so encrypt it.
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Methods for check user password is correct and decrypt. --
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Methods for generate access token --
userSchema.methods.getAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

// Methods for generate Password reset token --
userSchema.methods.getPasswordResetToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and add to resetPasswordToken field --
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Expiry time for password reset token
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
export { User };
