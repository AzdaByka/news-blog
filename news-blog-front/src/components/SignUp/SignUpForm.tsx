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
    password1?: string;
    password2?: string;
}

interface InterfaceState {
    login: string;
    email: string;
    error: any;
    password1: string;
    password2: string;
    avatar:string|null|ArrayBuffer;
    tel:string;
    name:string;
    surname:string;
    patronymic:string
}

export class SignUpForm extends React.Component<
    InterfaceProps,
    InterfaceState
    > {
    private static INITIAL_STATE = {
        login: "",
        error: null,
        email: "",
        password1: "",
        password2: "",
        avatar:"",
        tel:"",
        name:"",
        surname:"",
        patronymic:"",
    };

    private static propKey(propertyName: string, value: any): object {
        return { [propertyName]: value };
    }

    constructor(props: InterfaceProps) {
        super(props);

        this.state = { ...SignUpForm.INITIAL_STATE };
    }


    async HandleFormSubmit(event: any){
        const localState:any=this.state
        event.preventDefault();
        await Auth.register(localState.login,localState.email, localState.password1,localState.avatar,
            localState.tel, localState.name,localState.surname,localState.patronymic);
        localStorage.setItem('path','/')
        localStorage.setItem('rubrics','Ваша лента')
        this.props.history.replace(HOME);
        window.location.reload();
    }

    public onSubmit = (event: any) => {
        const { login, password1 } = this.state;


        const { history } = this.props;


        event.preventDefault();
    };

    public render() {
        const { login, password1, password2, email, error } = this.state;

        const isInvalid = password1 === "" || password2 === "" ||login === "" || email === "" || password1!==password2;

        return (
            <div className={'container my-5'}>
                <div className={'row justify-content-md-center'}>
                    <div className={'col-md-3'}>
                    </div>
                    <div className="Article col-md-6">
                        <h3 className={"text-center"}>Регистрация</h3>
                        <Form onSubmit={event => this.HandleFormSubmit(event)}>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="email"  onChange={event => this.setStateWithEvent(event, "email")}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicLogin">
                                <Form.Control type="text" placeholder="Логин"  required onChange={event => this.setStateWithEvent(event, "login")}/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control type="password" placeholder="пароль" required onChange={event => this.setStateWithEvent(event, "password1")}/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea2">
                                <Form.Control type="password" placeholder="пароль еще раз" required onChange={event => this.setStateWithEvent(event, "password2")}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicName">
                                <Form.Control type="text" placeholder="Имя"  required onChange={event => this.setStateWithEvent(event, "name")}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicSurname">
                                <Form.Control type="text" placeholder="Фамилия" required onChange={event => this.setStateWithEvent(event, "Surname")}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicPatronymic">
                                <Form.Control type="text" placeholder="Отчество" required onChange={event => this.setStateWithEvent(event, "Patronymic")}/>
                            </Form.Group>
                            <Form.Group>
                                <label htmlFor="exampleControlsFile1">Выбирите Аватар</label>
                                <Form.File required id="exampleControlsFile1" onChange={(e:any)=>{
                                    this.uploadImage(e)
                                }}/>
                            </Form.Group>
                            <Form.Group controlId="formBasicTel">
                                <Form.Control  type="text" required minLength={11} maxLength={11} placeholder="Телефон"  onChange={event => this.setStateWithEvent(event, "tel")}/>

                            </Form.Group>

                            <Button  variant="primary" disabled={isInvalid} type="submit" block>
                                Зарегистрироваться
                            </Button>
                            <Button href="/signin" variant="outline-dark"  block>Авторизоваться</Button>


                        </Form>

                    </div>
                    <div className={'col-md-3'}>
                    </div>
                </div>
            </div>
        );
    }

    private uploadImage = async (e:any)=>{
        const file = e.target.files[0]
        const base64 = await this.convertBase64(file);
        this.setState({
            avatar:base64
        })
        console.log(this.state.avatar)
    }

    private convertBase64 = (file:any):Promise<string|null|ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

        });
    };

    private setStateWithEvent(event: any, columnType: string): void {
        this.setState(SignUpForm.propKey(columnType, (event.target as any).value));
    }
}