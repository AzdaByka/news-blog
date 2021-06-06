import React, {Component, useEffect, useState} from 'react';
import {IArticle} from '../../types/articles';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ArticleItem from "../../components/article/ArticleItem";
import axios from "axios";
import { ArticleList } from '../../components/article/ArticleList';
import  UserItem  from '../../components/User/UserItem';

import  {Menu}  from '../../components/Menu/Menu';
import history from '../../constants/history'
import {BASE, ME} from "../../constants/routes";
import Auth from "../../connection/auth";
import {IUser} from "../../types/user";


export interface IProps {
    error: any;
    isLoaded: false;
}

export interface IState{
    user:IUser
}

export class AccountPage extends Component{

    constructor(props: IProps, state:IState) {
        super(props);
        this.state = {
            error: '',
            user:null
        };
    }

    async componentDidMount() {
        try {

            const response = await axios.get<IUser[]>(
                BASE+ME,
                {
                    headers:{
                        authorization:Auth.getUserJWY(),
                    },
                }
            )
            this.setState({
                isLoaded: true,
                user: response.data
            })
        } catch (e) {
            alert(e)
            console.log(Auth.getUserJWY())

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
        }  else {
            return (
                <div>
                    <div className='rubrics'>
                        {localStorage.rubrics}
                    </div>
                    <div className={".NewsItemContainer"}>
                        <Menu history={history}/>
                        {/*<UserItem user={localState.user}/>*/}
                        <ArticleList />
                    </div>
                </div>
            );
        }
    }
}