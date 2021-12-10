import './Navbar.css'


import React, {Component} from "react";
import { Rubrics, RubricRoute} from "../../../routes/rubricsRoutes";
import {Link, Route, Switch, withRouter} from "react-router-dom";
import {SignOutButton} from "../../SignOutButton/SignOutButton";
import {IArticle} from "../../../types/articles";
import history from "../../../constants/history";
import {AppRoute, AppRoutes} from "../../../routes/appRoutes";
import logo from "../../../stylesheets/imgs/logo.jpg";
import magnifier from "../../../stylesheets/imgs/magnifier.svg";
import vector from "../../../stylesheets/imgs/vector.svg";
import {Navigation} from "../../Navigation/Navigation";
import {AuthRoutes} from "../../../routes/authRoutes";
import {BASE, HOME, SEARCH} from "../../../constants/routes";
import axios from "axios";
import Auth from "../../../connection/auth";




export interface IProps {
    history: any;

}

export interface IState {
    body:string
}

export class Navbar extends Component<IProps, IState> {

    constructor(props: IProps, state: IState) {
        super(props, state);
        this.state = {
            body:''
        }
    }



    private setStateWithEvent(event: any): void {
        this.setState({body:(event.target as any).value});
        console.log(this.state.body)
    }

    async searchArticleOrChannel(event:any){
        event.preventDefault();
        const localState=this.state
        // const response = await axios.get<IArticle[]>(
        //     BASE+'/article/search',
        //     {
        //         params:{
        //             "id":Auth.getUserId(),
        //             "query":localState.body
        //         },
        //         headers:{
        //             authorization:"Bearer "+Auth.getUserJWT(),
        //         },
        //     }
        // )
        localStorage.setItem('path','/article/search')
        localStorage.setItem('search',localState.body)
        localStorage.setItem('rubrics','Результаты поиска')
        history.replace(SEARCH)
    }

    handleSearchText(){

    }

    rubricChange(rub:string){
    localStorage.setItem("rubrics",rub)
        localStorage.setItem("path","/")
    }

    render(){
        return( <div className='row'>
            <div className='col-md-3 pl-5 py-4 '>

                <Link to={HOME} id="home" onClick={()=>this.rubricChange("Все статьи")}>
                    <img className={'logo-img d-inline-block'}  src={logo} />

                    <div className={'logo d-inline-block'}>

                        Star
                    </div>
                </Link>



            </div>
            <div className='col-md-6  py-4'>


                    <img className={'magnifier'} src={magnifier}/>

                    <input onChange={event =>  this.setStateWithEvent(event)} value={this.state.body} className={'search-box form-control d-inline-block'} type="text" placeholder={'   Статья, канал.'} aria-describedby="button-addon2"/>

                    <button onClick={event => this.searchArticleOrChannel(event)} className="btn btn-outline-secondary d-inline-block search-box-btn" type="button" id="button-addon2">найти
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

