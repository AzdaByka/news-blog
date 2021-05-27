import React, {useEffect, useState} from 'react';
import {IArticle} from '../types/articles';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ArticleItem from "../components/ArticleItem";
import axios from "axios";
import {findAllByDisplayValue} from "@testing-library/react";

const ArticlePage: React.FC=({})=> {

    const [articles, setArticles]= useState<IArticle[]>([])


    const [body,setBody]= useState("")

    useEffect(()=>{
        fetchArticles()
    },[])


    const handleBody = (e: ((prevState: string) => string) | string) =>{
        setBody(e)
    }


    async function fetchArticles(){
        try{
            const response =await axios.get<IArticle[]>('http://localhost:3001/api/article')
            console.log(response.data[0].name)
            setArticles(response.data)
        }
        catch (e){
            alert(e)
        }
    }

    return (
        <div className="articleEditor">
            <ReactQuill
                placeholder="fdsdfsd"
                onChange={handleBody}
                value={body}
            />
            {articles.map(article=>
                <ArticleItem key={article.id} article={article}/>
            )}
            <div>
                {body}
            </div>
        </div>

    );
}
export default ArticlePage;

export class ArticlePage {
    const [articles, setArticles]= useState<IArticle[]>([])


    const [body,setBody]= useState("")

    useEffect(()=>{
    fetchArticles()
},[])


const handleBody = (e: ((prevState: string) => string) | string) =>{
    setBody(e)
}


async function fetchArticles(){
    try{
        const response =await axios.get<IArticle[]>('http://localhost:3001/api/article')
        console.log(response.data[0].name)
        setArticles(response.data)
    }
    catch (e){
        alert(e)
    }
}

}