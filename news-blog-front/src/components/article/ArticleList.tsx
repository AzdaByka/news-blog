import React, {Component} from "react";
import axios from "axios";
import {IArticle} from "../../types/articles";
import ArticleItem from "./ArticleItem";
import './articleList.css'


export interface IAppProps {
    error?: any;
    isLoaded?: false;
    articles?: [];
    rubrics:string
}



export class ArticleList extends Component<IAppProps>{

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            error: '',
            isLoaded: false,
            articles: [],
            rubrics:this.props.rubrics
        };

    }

    async componentDidMount() {
        try {
            const response = await axios.get<IArticle[]>('http://localhost:3001/api/article')
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
                    {/*{localState.rubrics}*/}
                    {localState.articles.map((article: IArticle)=>
                        <ArticleItem key={article.id} article={article}/>
                    )}
                </div>
            );
        }
    }
}

