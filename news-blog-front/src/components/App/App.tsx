import React, { Component } from 'react';
import { Route, Switch, Router } from "react-router-dom";
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import './App.css'
import magnifier from '../../stylesheets/imgs/magnifier.svg'
import "typeface-ubuntu";
import { Navigation } from "../Nagation/Navigation";
import history from '../../constants/history';
import { AppRoutes, AppRoute } from '../../routes/appRoutes';
import logo from '../../stylesheets/imgs/logo.jpg'
import vector from '../../stylesheets/imgs/vector.svg'

class AppComponent extends Component {
    constructor(props: any) {
        super(props);
        localStorage.setItem('user','')
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
                <div>

                    <div className='row '>
                        <div className='col-md-3 pl-5 py-4'>
                            <div className={'logo'}>
                            <img className={'logo-img'} src={logo} />
                            Star
                            </div>
                        </div>
                            <div className='col-md-6  py-4'>
                        <div className={'search-box'}/>
                        <img className={'magnifier'} src={magnifier}/>
                        <input className={'search-box-placeholder'} type="text" placeholder={'Статья, канал.'}/>
                            </div>
                        <div className='col-md-3 align-content-end'>
                        <img className={'vector'} src={vector}/>
                    <Navigation history={history}/>
                        </div>
                    </div>
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