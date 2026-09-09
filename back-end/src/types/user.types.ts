import { Types } from "mongoose";

export interface IWatchHistory {
    anime:Types.ObjectId,
    episodeNumber:number
    watchedAt?:Date
}

export interface IUser extends Document {
    username:string
    email:string
    password:string
    avatar?:string
    role:'User' | 'Admin'
    bookmarks:Types.ObjectId[]
    watchHistory:IWatchHistory[]
    createAt:Date
    updateAt:Date
    comparePassword(candidatePassword: string): Promise<boolean>;
}