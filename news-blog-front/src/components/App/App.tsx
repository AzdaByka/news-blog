import React, { Component } from 'react';
import { Route, Switch, Router } from "react-router-dom";
import './App.css'
import magnifier from '../../stylesheets/imgs/magnifier.svg'
import "typeface-ubuntu";
import { firebase } from '../../firebase';

import { Navigation } from "../Nagation/Navigation";
import history from '../../constants/history';
import { AppRoutes, AppRoute } from '../../routes/appRoutes';
import { withAuthentication } from '../../firebase/withAuthentification';
import logo from '../../stylesheets/imgs/logo.jpg'
import vector from '../../stylesheets/imgs/vector.svg'

class AppComponent extends Component {
    constructor(props: any) {
        super(props);

        this.state = {
            authUser: null
        };
    }

    public componentDidMount() {
        firebase.auth.onAuthStateChanged((authUser: any) => {
            authUser
                ? this.setState(() => ({ authUser }))
                : this.setState(() => ({ authUser: null }));
        });
    }


    public render() {
        return (

            <Router history={history}>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500&display=swap" rel="stylesheet"/>
                <div>
                    <img className={'logo-img'} src={logo} />
                    <div className={'logo'}>
                        Star
                    </div>
                    <div className={'search-box'}/>
                    <img className={'magnifier'} src={magnifier}/>
                    <input className={'search-box-placeholder'} type="text" placeholder={'Статья, канал.'}/>
                    <img className={'vector'} src={vector}/>

                    {/*<Navigation />*/}
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

export const App = withAuthentication(AppComponent);