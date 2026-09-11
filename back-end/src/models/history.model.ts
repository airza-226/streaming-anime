import { model, Schema } from "mongoose";
import { IWatchHistory } from "../types/anime.types";

const watchHistorySchema = new Schema<IWatchHistory>({
    user:{type:Schema.Types.ObjectId,ref:'User',required:true,index:true},
    anime:{type:Schema.Types.ObjectId,ref:"Anime",required:true},
    episode:{type:Schema.Types.ObjectId,ref:"Episode",required:true},
    progress:{type:Number,default:0},
    duration:{type:Number,default:0},
    isCompleted:{type:Boolean,default:false},
    lastWatchedAt:{type:Date,default:Date.now}
},
{timestamps:true})

watchHistorySchema.index({user:1,episode:1},{unique:true})

export const WatchHistory = model<IWatchHistory>('WatchHistory',watchHistorySchema)