import React, {Component} from 'react';
import {IArticle} from '../../types/articles';
import history from '../../constants/history';
import './articleItem.css';
interface ArticleProps {
    article:IArticle
}
export default class NewsItem extends Component<ArticleProps> {

    public render() {
        const article = this.props.article;
        return (

                <div className="Article col-md-6" onClick={()=> this.handleClick(article)}>

                <div className="ArticleTitle">
                    <h2>{article?.title}</h2>
                </div>
                <img src={"data:image/gif;base64," + article?.imgs} alt="Logo"/>
                <div>{article?.shortDescription}</div>

            </div>


        );
    }

    handleClick(article: IArticle)  {
        localStorage.setItem('id', String(article.id))
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