import './Menu.css'
import React, {Component} from "react";
import { Rubrics, RubricRoute} from "../../routes/rubricsRoutes";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import {SignOutButton} from "../SignOutButton/SignOutButton";
import {IArticle} from "../../types/articles";
import history from "../../constants/history";
import {AppRoute, AppRoutes} from "../../routes/appRoutes";




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

    handleClick = (id: number, description:string): void => {
        this.setState({activeLink: id,});
        if (id != 1)
            localStorage.setItem('rubrics', description);
        else localStorage.setItem('rubrics', 'Ваша лента');

    }


    render(){
        return(<ul className='Navigation'>
            {Rubrics.map((route: RubricRoute) => (
                <li className="NavigationLi" key={route.id} onClick={() => this.handleClick(route.id, route.description)}>
                    <Link to={route.path}
                          className={(route.id === this.state.activeLink ? "active_item" : "")}>
                        {route.description}
                    </Link>
                </li>
            ))}
        </ul>);
    }
}

