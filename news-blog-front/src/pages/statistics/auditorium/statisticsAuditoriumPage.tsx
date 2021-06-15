import React, {Component, useEffect, useState} from 'react';
import {IArticle} from '../../../types/articles';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {Link, Route, Switch, withRouter} from "react-router-dom";
import ArticleItem from "../../../components/article/ArticleItem";
import axios from "axios";
import './statisticsAuditoriumPage.css'
import {findAllByDisplayValue} from "@testing-library/react";
import { ArticleList } from '../../../components/article/ArticleList';
import  {Menu}  from '../../../components/Menu/Menu';
import history from '../../../constants/history'
import {ARTICLE_CREATE, BASE, HOME, ME, STATISTICS_AUDITORIUM, STATISTICS_PUBLICATION} from "../../../constants/routes";
import {NavbarEditor} from "../../../components/Navbars/NavbarEditor/NavbarEditor";
import {IUser} from "../../../types/user";
import Auth from "../../../connection/auth";
import Chart from '../../../components/chart/chart';




export interface IAppProps {
    error: any;
    isLoaded: false;
    statistics:[]
    total:[]
}

export default class StatisticsAuditoriumPage extends Component{

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            error: '',
            statistics:[],
            total:[]
        };
    }

    async componentDidMount() {
        try {

            const response = await axios.get(
                BASE+STATISTICS_PUBLICATION,
                {
                    params:{
                        "id":Auth.getUserId()
                    },
                    headers:{
                        authorization:"Bearer "+Auth.getUserJWT(),
                    },
                }
            )
            const totalRes=response.data[response.data.length-1]
            response.data.pop()
            const statistic=response.data
            console.log(statistic.length)
            console.log(totalRes)
            this.setState({
                isLoaded: true,
                statistics: statistic,
                total:totalRes
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
        const last=localState.statistics.length
        const border='none'
        if (localState.error) {
            return <div>Error: {localState.error!.message}</div>;
        }  else {
            localStorage.setItem('path','/editor')
            return (
                <>
                    <NavbarEditor history={history}/>

                    <div className={"container mt-4"}>
                        <div className="row">
                            <h2>Статистика</h2>
                        </div>
                        <div className="row m-3">
                            <div className=" col-2">
                                <Link  to={STATISTICS_PUBLICATION} >
                                <span className={'linkColor'}>
                                Публикации
                                    </span>
                                </Link>

                            </div>
                            <div  className=" col-2">
                                <Link  to={STATISTICS_AUDITORIUM} >
                                    <span className={'linkColor'}>
                                Аудитория канала
                                            </span>

                                </Link>

                            </div>
                            <div className="col-6">
                            </div>
                            <div className="col-2">
                                {/*Скачать отчет*/}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2 p-0 m-0">
                                <hr className={'hrChecked'} color={"#C4C4C4"} />
                            </div>
                            <div className="col-2 p-0 m-0">
                                <hr className={'hrChecked'} color={"red"} />
                            </div>
                            <div className="col-8 p-0 m-0">
                                <hr className={'hrChecked'} color={"#C4C4C4"} />
                            </div>
                        </div>

                    <Chart/>
                    </div>

                </>
            );
        }
    }
}