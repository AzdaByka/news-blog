import './Menu.css'
import React, {Component} from "react";
import { Rubrics, RubricRoute} from "../../routes/rubricsRoutes";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import {SignOutButton} from "../SignOutButton/SignOutButton";
import {IArticle} from "../../types/articles";
import history from "../../constants/history";
import {AppRoute, AppRoutes} from "../../routes/appRoutes";
import {LittleFooter} from "../Footer/LittleFooter/LittleFooter";
import Auth from '../../connection/auth'




export interface IProps {
    history: any;
}

export interface IState {
    activeLink: number;
}

export class Menu extends Component<IProps, IState> {

    constructor(props: IProps, state: IState) {
        super(props, state);
        this.state = {
            activeLink: 0
        }
    }

    handleClick = (id: number, description:string,path:string): void => {
        this.setState({activeLink: id,});

        if (id != 1)
        {
            localStorage.setItem('path', path);
            localStorage.setItem('rubrics', description);
        }
        else{
            localStorage.setItem('path', '/article/subscribe');
            localStorage.setItem('rubrics', 'Ваша лента');
            if (Auth.isAuth())
            {
                // window.location.replace('/')
                // window.location.reload()
            }


        }
    }


    render(){
        return(
            <div>
            <ul className='Menu'>
            {Rubrics.map((route: RubricRoute) => (
                <li className="MenuLi" key={route.id} onClick={() => this.handleClick(route.id, route.description, route.path)}>
                    <Link to={route.path}
                          className={(route.id === this.state.activeLink ? "active_item" : "")}>
                        <img className={'mr-1'} src={route.img} alt=""/>
                        {route.description}
                    </Link>
                </li>
            ))}
        </ul>
                <LittleFooter/>
            </div>);
    }
}

