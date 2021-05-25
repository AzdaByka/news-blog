import {ADD_NEWS, EDIT_NEWS, LOAD_NEWS, REMOVE_NEWS} from "./newsActions";
import {IArticle} from '../types/articles';
import {type} from "os";
import {ADD_COMMENT, RATE_ARTICLE} from "./acticleActions";

export const loadNews=():NewsActionType=>{
    return{
        type:LOAD_NEWS
    }
}

export const addNews=(article:IArticle):NewsActionType=>{
    return{
        type:ADD_NEWS,
        article
    }
}

export const removeNews =(id:string):NewsActionType=>{
    return {
        type:REMOVE_NEWS,
        id
    }
}

export const editNews =(article:IArticle):NewsActionType=>{
    return {
        type:EDIT_NEWS,
        article
    }
}


export const rateArticle=(id:string, rate:number):ArticleActionType=>{
    return {
        type:RATE_ARTICLE,
        id,
        rate
    }
}

export const addComment=(id:string, comment:string):ArticleActionType=>{
    return {
        type:ADD_COMMENT,
        id,
        comment,
    }
}

export interface ActionTypesBase{
    type:string
}

export interface NewsActionType extends ActionTypesBase{
    id?:string,
    article?:IArticle,
}

export interface ArticleActionType extends ActionTypesBase{
    id?:string,
    rate?:number,
    comment?:string
}