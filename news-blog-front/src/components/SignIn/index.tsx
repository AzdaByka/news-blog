import * as React from "react";
import { withRouter } from "react-router-dom";
import { SignInForm } from "./SignInForm";
import history from "../../constants/history";
import {NavbarAuth} from "../Navbars/NavbarAuth/NavbarAuth";

const SignInComponent = ({ history }: { [key: string]: any }) => (
    <div>
        <NavbarAuth history={history}/>
        <SignInForm history={history} />
    </div>
);

export const SignIn = withRouter(SignInComponent);