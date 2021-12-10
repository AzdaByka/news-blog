import React, { Component } from 'react';
import './Navigation.css';

import {Dropdown} from './dropDuwn'
import { Link, withRouter } from "react-router-dom";
import { AuthRoutes, NonAuthRoutes, Route } from '../../routes/authRoutes';
import { SignOutButton } from '../SignOutButton/SignOutButton';
import logo from "../../stylesheets/imgs/logo.jpg";
import magnifier from "../../stylesheets/imgs/magnifier.svg";
import vector from "../../stylesheets/imgs/vector.svg";
import Auth from '../../connection/auth'

export interface IProps {
    history: any;
}

export interface IState {
    activeLink: number;
    isAuth: boolean
}


export class Navigation extends Component<IProps, IState> {

    constructor(props: IProps, state: IState) {
        super(props, state);
        this.state = {
            activeLink: 0,
            isAuth: false
        }
    }
    async componentDidMount() {
        this.setState({
            isAuth:Auth.isAuth()
        })
        console.log(this.state.isAuth)
    }


    handleClick = (id: number): void => {
        if (id===1 && Auth.isAuth())
            localStorage.setItem('path','/article/subscribe')
        this.setState({ activeLink: id });
    }

    render(){
        if(this.state.isAuth){
            return(
                <div>

                <ul className='Navigation'>

                {AuthRoutes.map((route: Route) => (
                    <li className="NavigationLi" key={route.id} onClick={() => this.handleClick(route.id)}>
                        <Link to={route.path}
                              className={(route.id === this.state.activeLink ? "active_item" : "")} id={route.idTest}>
                            {route.description}
                        </Link>
                    </li>
                ))}

                <li className="NavigationLi"><SignOutButton/></li>

            </ul>

                </div>
            );
        }
        else
            return(
                <ul className='Navigation'>
                    {NonAuthRoutes.map((route: Route) => (
                        <li className="NavigationLi" key={route.id} onClick={() => this.handleClick(route.id)}>
                            <Link to={route.path}
                                  className={(route.id === this.state.activeLink ? "active_item" : "")} id="login">
                                {route.description}
                            </Link>
                        </li>
                    ))}
                </ul>);
    }
}

