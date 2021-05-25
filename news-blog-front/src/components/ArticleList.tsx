import React from 'react';
import {IArticle} from '../types/articles';
import ArticleItem from "./ArticleItem";

interface ArticleListProps {
    articles:IArticle[]
}
const ArticleList: React.FC<ArticleListProps>=({
    articles
    })=> {

    return (
        <div>
            {articles.map(article=>
                <ArticleItem key={article.id} article={article}/>
            )}
        </div>
    );
}
export default ArticleList;
