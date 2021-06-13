import React, {Component, useEffect, useState} from 'react';
import {IArticle} from '../../types/articles';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ArticleItem from "../../components/article/ArticleItem";
import axios from "axios";
import './articlePage.css'
import {findAllByDisplayValue} from "@testing-library/react";
import { ArticleList } from '../../components/article/ArticleList';
import  {Menu}  from '../../components/Menu/Menu';
import history from '../../constants/history'
import {Navbar} from "../../components/Navbars/NavbarMain/Navbar";

// const ArticlePage: React.FC=({})=> {
//
//     const [articles, setArticles]= useState<IArticle[]>([])
//
//
//     const [body,setBody]= useState("")
//
//     useEffect(()=>{
//         fetchArticles()
//     },[])
//
//
//     const handleBody = (e: ((prevState: string) => string) | string) =>{
//         setBody(e)
//     }
//
//
//     async function fetchArticles(){
//         try{
//             const response =await axios.get<IArticle[]>('http://localhost:3001/api/article')
//             console.log(response.data[0].name)
//             setArticles(response.data)
//         }
//         catch (e){
//             alert(e)
//         }
//     }
//
//     return (
//         <div className="articleEditor">
//             <ReactQuill
//                 placeholder="fdsdfsd"
//                 onChange={handleBody}
//                 value={body}
//             />
//             {articles.map(article=>
//                 <ArticleItem key={article.id} article={article}/>
//             )}
//             <div>
//                 {body}
//             </div>
//         </div>
//
//     );
// }
// export default ArticlePage;

export interface IAppProps {
    error: any;
    isLoaded: false;
    body:string
}

export class ArticlePage extends Component{

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            error: '',
            body:''
        };
    }


    // handleBody = (e: ((prevState: string) => string) | string) => {
    //     this.setState({
    //         body:e,
    //     });
    // }

    public render() {

        const localState: any = this.state;
        if (localState.error) {
            return <div>Error: {localState.error!.message}</div>;
        }  else {
            return (
                <>
                    <Navbar history={history}/>

                    <div className={"container"}>

                        <div className={"row"}>
                            <div className={"col-md-3"}>
                        <Menu history={history}/>
                            </div>
                                <div className={"col-md-9"}>
                            <div className='rubrics'>
                                {localStorage.rubrics}
                            </div>


                        {/*<div className="row py-4">*/}
                        {/*<ArticleList />*/}
                        {/*</div>*/}
                                    <ArticleList />
                                </div>
                                    {/*<ReactQuill*/}
                                    {/*    placeholder="fdsdfsd"*/}
                                    {/*    onChange={this.handleBody}*/}
                                    {/*    value={localState.body}*/}
                                    {/*/>*/}

                    </div>
                    </div>

                </>
            );
        }
    }
}