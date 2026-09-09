import {Schema,model} from 'mongoose'
import { IAnime,IEpisode } from '../types/anime.types'
const episodeSchema = new Schema<IEpisode>({
    episodeNumber:{type:Number,required:true},
    title:{type:String,required:true,trim:true},
    videoUrl:{type:String,required:true},
    duration:Number,
   releaseDate: { type: Date, default: Date.now },
})

const animeSchema = new Schema<IAnime>({
    title:{type:String,required:true,trim:true,unique:true},
    slug:{type:String,required:true,unique:true,lowerCase:true,index:true},
    synopsis:{type:String,required:true},
    coverImage:{type:String,required:true,},
    bannerImage:String,
    genres:{type:[String],required:true,index:true},
    status:{type:String,enum:['Ongoing',"Completed"],default:'Ongoing'},
    rating:{type:String,default:0,min:0,max:10},
    episodes:[episodeSchema]
},
{timestamps:true})

export const Anime = model<IAnime>('Anime',animeSchema)