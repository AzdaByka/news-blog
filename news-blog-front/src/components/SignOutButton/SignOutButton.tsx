import * as React from "react";
import "./SO.css";
import {HOME,ARTICLE} from "../../constants/routes";
import history from "../../constants/history";
import Auth from '../../connection/auth'

export const SignOutButton = () => (
    <button type="button" onClick={doSignOut} className="NavigaionButton">
        Sign Out
    </button>


);


async function doSignOut(){
    await Auth.logout();
    history.push(HOME);
    window.location.reload();
}