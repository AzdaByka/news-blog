import React, {Component} from "react";
import axios from "axios";
import {IArticle} from "../../types/articles";
import ArticleItem from "./ArticleItem";
import './articleList.css'
import {BASE, SIGN_IN} from "../../constants/routes"
import {useSelector} from "react-redux";
import Auth from '../../connection/auth'


export interface IAppProps {
    error?: any;
    isLoaded?: false;
    articles?: [];
}



export class ArticleList extends Component<IAppProps>{

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            error: '',
            isLoaded: false,
            articles: [],
        };
    }

    async componentDidMount() {
        try {
                console.log(Auth.getUserId())
            const response = await axios.get<IArticle[]>(
                BASE+localStorage.getItem('path'),
                {
                    params:{
                        "id":Auth.getUserId(),
                    },
                    headers:{
                        authorization:"Bearer "+Auth.getUserJWT(),
                    },
                }
                )
            console.log(response.data)

            this.setState({
                isLoaded: true,
                articles: response.data
            })
        } catch (e) {
            //alert(e)
            console.log(e.response)
            this.setState({
                isLoaded: true,
                error:e.response.data,


            });
        }
    }
    public render() {
        const localState: any = this.state;
        if (localState.error) {
            return <div className={"my-5"}>Error: {localState.error}</div>;
        } else if (!localState.isLoaded) {
            return <div className="spinner-border my-5" role="status">
                <span className="visually-hidden ">Загрузка...</span>
            </div>;
        } else {
            return (

                <div className="row py-4">
                    {localState.articles.map((article: IArticle)=>
                        <ArticleItem key={article.id} article={article}/>
                    )}

                </div>
            );
        }
    }
}

