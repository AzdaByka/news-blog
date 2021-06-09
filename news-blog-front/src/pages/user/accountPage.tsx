import React, {Component, useEffect, useState} from 'react';
import {IArticle} from '../../types/articles';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ArticleItem from "../../components/article/ArticleItem";
import axios from "axios";
import {ArticleList, IAppProps} from '../../components/article/ArticleList';
import  UserItem  from '../../components/User/UserItem';

import  {Menu}  from '../../components/Menu/Menu';
import history from '../../constants/history'
import {BASE, ME} from "../../constants/routes";
import Auth from "../../connection/auth";
import {IUser} from "../../types/user";


export interface IProps {
    error: any;
    isLoaded: false;
    user:[],
}



export class AccountPage extends Component<IAppProps>{

    constructor(props: IProps) {
        super(props);
        this.state = {
            error: '',
            user:[],
        };
    }

    async componentDidMount() {
        try {
            const response = await axios.get<IUser>(
                BASE+ME,
                {
                    headers:{
                        authorization:"Bearer "+Auth.getUserJWT(),
                    },
                }
            )
            console.log(response.data.name)
            this.setState({
                isLoaded: true,
                user: response.data
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
        }  else {
            return (
                <div>
                    <div className="container">
                    <div className="row">
                        <Menu history={history}/>
                            <UserItem key={localState.user.id} user={localState.user}/>
                    </div>

                        <ArticleList />

                </div>
                </div>
            );
        }
    }
}