import React, { Component } from 'react';
import { Route, Switch, Router } from "react-router-dom";
import './App.css'
import magnifier from '../../stylesheets/imgs/magnifier.svg'
import "typeface-ubuntu";
import { Navigation } from "../Navigation/Navigation";
import history from '../../constants/history';
import { AppRoutes, AppRoute } from '../../routes/appRoutes';
import logo from '../../stylesheets/imgs/logo.jpg'
import vector from '../../stylesheets/imgs/vector.svg'
import {Navbar} from "../Navbars/NavbarMain/Navbar";

class AppComponent extends Component {
    constructor(props: any) {
        super(props);
        localStorage.setItem('user','')
        localStorage.setItem('path','/')
        localStorage.setItem('rubrics','Все статьи')
        this.state = {

        };
    }

    public componentDidMount() {

    }


    public render() {
        return (

            <Router history={history}>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500&display=swap" rel="stylesheet"/>
                <div className={'fontStyle'}>


                    <Switch>
                        {
                            AppRoutes.map((route: AppRoute) => (
                                <Route exact={route.exact}
                                       path={route.path}
                                       component={route.component}
                                       key={route.path} />))
                        }
                    </Switch>
                        </div>



            </Router>
        );
    }
}

export const App = AppComponent;