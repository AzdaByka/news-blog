import * as React from "react";
import * as routes from "../../constants/routes";
import Auth from '../../connection/auth'
import {BASE, SIGN_IN,HOME} from "../../constants/routes"


interface InterfaceProps {
    email?: string;
    error?: any;
    history?: any;
    password?: string;
}

interface InterfaceState {
    login: string;
    error: any;
    password: string;
}

export class SignInForm extends React.Component<
    InterfaceProps,
    InterfaceState
    > {
    private static INITIAL_STATE = {
        login: "",
        error: null,
        password: ""
    };

    private static propKey(propertyName: string, value: any): object {
        return { [propertyName]: value };
    }

    constructor(props: InterfaceProps) {
        super(props);

        this.state = { ...SignInForm.INITIAL_STATE };
    }


    async HandleFormSubmit(event: any){
        event.preventDefault();
        await Auth.login(this.state.login, this.state.password);
        this.props.history.replace(HOME);
        window.location.reload();
    }

    public onSubmit = (event: any) => {
        const { login, password } = this.state;


        const { history } = this.props;

        // auth
        //     .doSignInWithEmailAndPassword(email, password)
        //     .then(() => {
        //         localStorage.setItem('authUser', email);
        //         this.setState(() => ({ ...SignInForm.INITIAL_STATE }));
        //         history.push(routes.HOME);
        //     })
        //     .catch(error => {
        //         this.setState(SignInForm.propKey("error", error));
        //     });

        event.preventDefault();
    };

    public render() {
        const { login, password, error } = this.state;

        const isInvalid = password === "" || login === "";

        return (
            <form onSubmit={event => this.HandleFormSubmit(event)}>
                <input
                    value={login}
                    onChange={event => this.setStateWithEvent(event, "login")}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    value={password}
                    onChange={event => this.setStateWithEvent(event, "password")}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }

    private setStateWithEvent(event: any, columnType: string): void {
        this.setState(SignInForm.propKey(columnType, (event.target as any).value));
    }
}