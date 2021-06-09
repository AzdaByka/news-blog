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
            <div className="User col-md-6" >

                <div className="ArticleTitle">
                    <h2>{user.name}</h2>
                    <h2>{user.surname}</h2>
                    <h2>{user.patronymic}</h2>
                </div>
                <img src={user.imgAvatar} alt="Logo"/>
            </div>
        );
    }
}
