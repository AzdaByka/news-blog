import * as React from "react";
import { withRouter } from "react-router-dom";
import {NavbarAuth} from "../Navbars/NavbarAuth/NavbarAuth";
import history from "../../constants/history";
import { SignUpForm } from "./SignUpForm";

const SignUpComponent = ({ history }: { [key: string]: any }) => (
    <div className={'container-fluid'}>
        <NavbarAuth history={history}/>
        <SignUpForm history={history}/>
    </div>
);

export const SignUp = withRouter(SignUpComponent);