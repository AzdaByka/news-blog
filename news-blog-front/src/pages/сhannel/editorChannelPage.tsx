import React, {Component, useEffect, useState} from 'react';
import {IArticle} from '../../types/articles';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {Link, Route, Switch, withRouter} from "react-router-dom";
import ArticleItem from "../../components/article/ArticleItem";
import axios from "axios";
import './editorChannelPage.css'
import {findAllByDisplayValue} from "@testing-library/react";
import { ArticleList } from '../../components/article/ArticleList';
import  {Menu}  from '../../components/Menu/Menu';
import history from '../../constants/history'
import {ARTICLE_CREATE, HOME} from "../../constants/routes";
import {NavbarEditor} from "../../components/Navbars/NavbarEditor/NavbarEditor";




export interface IAppProps {
    error: any;
    isLoaded: false;
    body:string
}

export class EditorChannelPage extends Component{

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            error: '',
            body:''
        };
    }



    public render() {

        const localState: any = this.state;
        if (localState.error) {
            return <div>Error: {localState.error!.message}</div>;
        }  else {
            localStorage.setItem('path','/editor')
            return (
                <>
                <NavbarEditor history={history}/>

                <div className={"container"}>
                    <div className="row">
                        <div className={"col-md-3"}>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <div className={"row"}>
                            <div className="Article col-md-12" >
                                <div className={"row  p-3 py-1"}>
                                <div className="ArticleTitle ml-3">
                                    <h3>Название канала</h3>
                                </div>
                                </div>
                                    <div className={"row pl-2 py-1"}>
                                <div className={"col-6 text-center sign"}>0</div>
                                <div className={"col-6 text-center sign"}>0</div>
                                    </div>
                                        <div className={"row pl-3 py-1"}>
                                <div className={"col-6 sign"}>Подписчики</div>
                                <div className={"col-6 sign"}>Аудитория</div>
                                        </div>
                                <div className={"row ml-3 py-1 "}>
                                    <button type="button" className={"btn btn-primary btnCustom"}>
                                        Настроить канал</button>

                                </div>
                                </div>

                            </div>
                        </div>



                    </div>
                        </div>
                        <div className={"col-md-9 pl-5"}>
                            <div className={"row"}>
                                <h2 className={"ml-5 d-inline"}>Публикации</h2>
                                <Link to={ARTICLE_CREATE} className="btn btn-primary d-inline ml-5" >
                                    Создать
                                </Link>
                            </div>
                            <ArticleList editor={true}/>
                        </div>
                    </div>

                </div>

</>
            );
        }
    }
}