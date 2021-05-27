import React, {Component} from 'react';
import {IArticle} from '../types/articles';
import history from '../constants/history';

interface ArticleProps {
    article:IArticle
}
export default class NewsItem extends Component<ArticleProps> {

    public render() {
        const article = this.props.article;
        return (
            <div className="Article">
                <div></div>
                <div className="ArticleTitle">
                    <h2>{article.name}name</h2>
                </div>
                <img src={"data:image/gif;base64," + article.preview} alt="Logo"/>
                <div>{article.shortDescription}shortDescription</div>
                <button className="moreBtn" onClick={()=> this.handleClick(article)}>More ...</button>
            </div>
        );
    }

    handleClick(article: IArticle)  {
        history.push("/article/" + article.id, {article: article});
    }
}
// const ArticleItem: React.FC<ArticleProps>=({article})=> {
//
//     return (
//         // <div>
//         //     <div style={{padding:15, border: '1px solid lightgray'}}>
//         //         {article.text}
//         //     </div>
//         // </div>
//     <div className="Article">
//         <div></div>
//         <div className="ArticleTitle">
//             <h2>{article.name}</h2>
//         </div>
//         <img src={"data:image/gif;base64," + article.preview} alt="Logo"/>
//         <div>{article.shortDescription}</div>
//         <button className="moreBtn" onClick={()=> this.handleClick(article)}>More ...</button>
//     </div>
//     );
//
// }
// export default ArticleItem;