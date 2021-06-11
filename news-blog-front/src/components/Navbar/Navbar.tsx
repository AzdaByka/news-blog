import './Navbar.css'


import React, {Component} from "react";
import { Rubrics, RubricRoute} from "../../routes/rubricsRoutes";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import {SignOutButton} from "../SignOutButton/SignOutButton";
import {IArticle} from "../../types/articles";
import history from "../../constants/history";
import {AppRoute, AppRoutes} from "../../routes/appRoutes";
import logo from "../../stylesheets/imgs/logo.jpg";
import magnifier from "../../stylesheets/imgs/magnifier.svg";
import vector from "../../stylesheets/imgs/vector.svg";
import {Navigation} from "../Navigation/Navigation";
import {AuthRoutes} from "../../routes/authRoutes";
import {HOME} from "../../constants/routes";




export interface IProps {
    history: any;
}

export interface IState {

}

export class Navbar extends Component<IProps, IState> {

    constructor(props: IProps, state: IState) {
        super(props, state);
        this.state = {

        }
    }

        rubricChange(rub:string){
        localStorage.setItem("rubrics",rub)
            localStorage.setItem("path","/")
        }

    render(){
        return( <div className='row'>
            <div className='col-md-3 pl-5 py-4 '>

                <Link to={HOME} onClick={()=>this.rubricChange("Ваша лента")}>
                    <img className={'logo-img d-inline-block'}  src={logo} />

                    <div className={'logo d-inline-block'}>

                        Star
                    </div>
                </Link>



            </div>
            <div className='col-md-6  py-4'>

                <img className={'magnifier'} src={magnifier}/>
                <input className={'search-box form-control d-inline-block'} type="text" placeholder={'   Статья, канал.'} aria-describedby="button-addon2"/>

                <button className="btn btn-outline-secondary d-inline-block search-box-btn" type="button" id="button-addon2">найти
                </button>

            </div>
            <div className='col-md-3 py-4'>

                {/*<img className={'vector'} src={vector}/>*/}
                <Navigation history={history}/>

            </div>
            </div>
                );
    }
}

