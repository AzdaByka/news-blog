import React from 'react';
import {IArticle} from '../types/articles';

interface ArticleProps {
    article:IArticle
}
const ArticleItem: React.FC<ArticleProps>=({article})=> {

    return (
        <div>
            <div style={{padding:15, border: '1px solid lightgray'}}>
                {article.text}
            </div>
        </div>
    );
}
export default ArticleItem;