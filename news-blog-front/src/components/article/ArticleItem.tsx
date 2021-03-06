import React, {Component} from 'react';
import {IArticle} from '../../types/articles';
import history from '../../constants/history';
import './articleItem.css';
import {IAppProps} from "./ArticleList";
import editor from '../../stylesheets/imgs/edit.png'
import deleteIcon from '../../stylesheets/imgs/delete.png'
import {ARTICLE_CREATE, BASE, EDITOR, HOME} from "../../constants/routes";
import { Link } from 'react-router-dom';
import axios from "axios";
import Auth from "../../connection/auth";


interface ArticleProps {
    article:IArticle
    editor?:boolean;
    id?:string
}

interface IState {

}

export default class NewsItem extends Component<ArticleProps> {
    constructor(props: ArticleProps) {
        super(props);
        this.state = {
            articles:props.article,
            editor: this.props?.editor||false,
            id:''
        };
    }

    distributeArticle(id:number){
        localStorage.setItem('articleId', String(id))
    }

    async deleteArticle(id:number){
        await axios.delete<IArticle[]>(
            BASE + '/article/delete',
            {
                params: {
                    "id": id
                },

                headers: {
                    authorization: "Bearer " + Auth.getUserJWT(),
                },
            }
        )
        this.setState({
            id:id,
        })
        history.replace(EDITOR);
        window.location.reload();

    }


    public render() {
        const article = this.props.article;
        if (this.props.editor)
        return (

                <div className="Article col-md-6" >
                <div className={'row'}>
                    <div className="ArticleTitle col-md-9">
                        <h2 onClick={()=> this.handleClick(article)}>{article?.title}</h2>
                    </div>
                    <div className={'col-md-3'}>
                        <Link  to={ARTICLE_CREATE} onClick={()=>this.distributeArticle(article.id)}>
                        <img className={'d-inline-block m-1 '} src={editor} alt=""/>
                        </Link>
                        <Link  to={'#'} onClick={()=>this.deleteArticle(article.id)}>
                        <img className={'d-inline-block m-1'}  src={deleteIcon} alt=""/>
                        </Link>
                    </div>
                </div>
                <img className={"imgPreview"} src={"" + article?.imgs} onClick={()=> this.handleClick(article)} alt="Logo"/>
                <div onClick={()=> this.handleClick(article)}>{article?.shortDescription}</div>

            </div>


        );
        else
            {
                return (


                                <div className="Article col-md-6" id={"art"} onClick={()=> this.handleClick(article)}>
                                        <h2>{article?.title}</h2>
                                <img className={"imgPreview"}  src={"" + article?.imgs} alt="Logo"/>
                                <div>{article?.shortDescription}</div>

                            </div>);
            }
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