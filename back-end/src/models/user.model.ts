import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types/user.types";

const watchHistorySchema = new Schema({
  anime: {
    type: Schema.Types.ObjectId,
    ref: "Anime",
    required: true,
  },
  episodeNumber: {
    type: Number,
    required: true,
  },
  watchedAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    avatar: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Anime",
      },
    ],
    watchHistory: [watchHistorySchema],
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>("User", userSchema);
