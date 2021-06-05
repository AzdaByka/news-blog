import React, {Component} from "react";
import axios from "axios";
import {IArticle} from "../../types/articles";
import ArticleItem from "./ArticleItem";
import './articleList.css'
import {BASE, SIGN_IN} from "../../constants/routes"
import {useSelector} from "react-redux";


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

            const response = await axios.get<IArticle[]>(BASE+localStorage.getItem('path'))
            console.log(response.data[0].title)
            this.setState({
                isLoaded: true,
                articles: response.data
            })
        } catch (e) {
            alert(e)
            console.log(e)
            this.setState({
                isLoaded: true,
                e
            });
        }
    }
    public render() {
        const localState: any = this.state;
        if (localState.error) {
            return <div>Error: {localState.error!.message}</div>;
        } else if (!localState.isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="NewsItemContainer">
                    {localState.articles.map((article: IArticle)=>
                        <ArticleItem key={article.id} article={article}/>
                    )}
                </div>
            );
        }
    }
}

