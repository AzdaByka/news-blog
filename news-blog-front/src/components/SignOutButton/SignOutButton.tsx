import * as React from "react";
import "./SO.css";
import {HOME, ARTICLE, SIGN_IN, EDITOR} from "../../constants/routes";
import history from "../../constants/history";
import Auth from '../../connection/auth'

export const SignOutButton = () => (
    <button type="button" onClick={doSignOut} className=" btn btn-danger ">
        Sign Out
    </button>


);


async function doSignOut(){
    await Auth.logout();
    localStorage.setItem('rubrics','Все статьи')
    localStorage.setItem('path','/')
    history.push(HOME);
    window.location.reload();

}