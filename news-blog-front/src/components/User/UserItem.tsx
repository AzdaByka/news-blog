import React, {Component} from 'react';
import {IUser} from '../../types/user';
import history from '../../constants/history';
interface ArticleProps {
    user:IUser
}
export default class UserItem extends Component<ArticleProps> {

    public render() {
        const user = this.props.user;
        return (
            <div className="User" >

                <div className="ArticleTitle">
                    <h2>{user.name}</h2>
                </div>
                <img src={"data:image/gif;base64," + user.avatar} alt="Logo"/>
            </div>
        );
    }
}
