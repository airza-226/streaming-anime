import { Types,model,Document, } from "mongoose"

export interface IEpisode{
    animeId:Types.ObjectId
    episodeNumber:number,
    title:string,
    videoUrl:string,
    duration:string,
    releaseDate:Date

}

export interface IAnime extends Document {
    title:string
    slug:string
    synopsis:string
    coverImage:string
    bannerImage:string
    genres:string[]
    status:'Ongoing'| 'Completed'
    rating?:number;
    episodes:IEpisode[]
}

export interface IWatchHistory extends Document {
  user: Types.ObjectId;
  anime: Types.ObjectId;
  episode: Types.ObjectId;
  progress: number;
  duration: number; 
  isCompleted: boolean;
  lastWatchedAt: Date;
}

export type WatchListStatus = 'watching' | 'plan_to_watch' | 'completed' | 'on_hold' | 'dropped';

export interface IWatchList extends Document {
    user:Types.ObjectId
    anime:Types.ObjectId
    status:WatchListStatus
}