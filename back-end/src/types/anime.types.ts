export interface IEpisode{
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