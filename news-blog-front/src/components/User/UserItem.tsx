import React, {Component} from 'react';
import {IUser} from '../../types/user';
import history from '../../constants/history';
import {Image} from "react-bootstrap";

interface ArticleProps {
    user:IUser
}
export default class UserItem extends Component<ArticleProps> {


    public render() {
        const user= this.props.user
        return (
            <div className="User col-md-6" >

                <Image  width={'100px'} height={'100px'} roundedCircle src={user.imgAvatar} alt="Logo"/>

                <div className="ml-5 mt-3 d-inline-block">
                    <h2>{user.name}</h2>
                </div>
                <div className="ml-3 mt-3 d-inline-block">
                    <h2>{user.surname}</h2>
                </div>

            </div>
        );
    }
}
