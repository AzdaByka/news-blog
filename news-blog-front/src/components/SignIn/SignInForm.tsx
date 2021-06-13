import * as React from "react";
import * as routes from "../../constants/routes";
import Auth from '../../connection/auth'
import {BASE, SIGN_IN,HOME, SIGN_UP} from "../../constants/routes"
import {Button, Form, Modal} from "react-bootstrap";
import { Link } from "react-router-dom";
import {MouseEventHandler} from "react";


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
        localStorage.setItem('path','/')
        localStorage.setItem('rubrics','Ваша лента')
        this.props.history.replace(HOME);
        window.location.reload();
    }

    public onSubmit = (event: any) => {
        const { login, password } = this.state;


        const { history } = this.props;


        event.preventDefault();
    };

    public render() {
        const { login, password, error } = this.state;

        const isInvalid = password === "" || login === "";

        return (
            <div className={'container my-5'}>
                <div className={'row justify-content-md-center'}>
                    <div className={'col-md-3'}>
                    </div>
                    <div className="Article col-md-6">
                        <h3 className={"text-center"}>Авторизация</h3>
                        <Form onSubmit={event => this.HandleFormSubmit(event)}>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Логин"  onChange={event => this.setStateWithEvent(event, "login")}/>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control type="password" placeholder="пароль"  onChange={event => this.setStateWithEvent(event, "password")}/>
                                </Form.Group>


                                <Button  variant="primary" disabled={isInvalid} type="submit" block>
                                    Войти
                                </Button>
                            <Button href="/signup" variant="outline-dark"  block>Зарегистрироваться</Button>


                        </Form>

                    </div>
                    <div className={'col-md-3'}>
                    </div>
                </div>
            </div>
        );
    }



    private setStateWithEvent(event: any, columnType: string): void {
        this.setState(SignInForm.propKey(columnType, (event.target as any).value));
    }
}