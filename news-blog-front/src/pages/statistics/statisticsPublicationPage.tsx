import React, {Component, useEffect, useState} from 'react';
import {IArticle} from '../../types/articles';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {Link, Route, Switch, withRouter} from "react-router-dom";
import ArticleItem from "../../components/article/ArticleItem";
import axios from "axios";
import './statisticsPublicationPage.css'
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

export default class StatisticPublicationPage extends Component{

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
                        <h2>Статистика</h2>
                        </div>
                        <div className="row">

                        </div>

                    </div>

                </>
            );
        }
    }
}