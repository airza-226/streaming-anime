import {Request,Response} from 'express'
import { asyncHandler } from "../../utils/asyncHandler";
import { Anime } from '../models/anime.model';
import { AppError } from '../../utils/appError';
export const getAllAnime = asyncHandler(async(req:Request,res:Response) => {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 12
    const skip = (page -1) * limit
    const filter:any = {}
    if(req.query.search) {
      filter.$text={ $search: req.query.search as string };
    }
    if(req.query.genre) {
        filter.genres = req.query.genres
    }
    if(req.query.status) {
        filter.status = req.query.status
    }

    const totalAnime = await Anime.countDocuments(filter)
    const animeList = await Anime.find(filter)
    .select('-episodes')
    .sort({createAt:-1})
    .skip(skip)
    .limit(limit)

    res.status(200).json({
        success:true,
        results:animeList.length,
        pagination:{
            totalData:totalAnime,
            totalPages:Math.ceil(totalAnime / limit),
            currentPage:page,
            limit,
        }
    })

 })

 export const getAnimeBySlug = asyncHandler(async(req:Request,res:Response) => {
    const anime = await Anime.findOne({slug:req.params.slug})
    if(!anime) {
        throw new AppError('Anime not found', 404)
    }
    res.status(200).json({
        success:true,
        data:anime
    })
 })

 export const createAnime = asyncHandler(async(req:Request,res:Response) => {
    const newAnime = await Anime.create(req.body)
    res.status(200).json({
        success:true,
        message:'Anime created successfully'
        data:newAnime
    })
 })