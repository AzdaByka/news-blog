import React, {Component, useEffect, useState} from 'react';
import {IArticle} from '../../types/articles';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ArticleItem from "../../components/article/ArticleItem";
import axios from "axios";
import {ArticleList, IAppProps} from '../../components/article/ArticleList';
import  UserItem  from '../../components/User/UserItem';

import  {Menu}  from '../../components/Menu/Menu';
import history from '../../constants/history'
import {BASE, EDITOR, ME} from "../../constants/routes";
import Auth from "../../connection/auth";
import {IUser} from "../../types/user";
import {Navbar} from "../../components/Navbars/NavbarMain/Navbar";
import {Button, Form, Modal} from 'react-bootstrap';
import {useForm} from "react-hook-form";
import {ICategory} from "../../types/category";


export interface IProps {
    error: any;
    isLoaded: false;
    user:[],
    show:boolean,
}



export class AccountPage extends Component<IAppProps>{

    constructor(props: IProps) {
        super(props);
        this.state = {
            error: '',
            user:[],
            show:false,
        };
    }

    async componentDidMount() {
        try {

            const response = await axios.get<IUser>(
                BASE+ME,
                {
                    headers:{
                        authorization:"Bearer "+Auth.getUserJWT(),
                    },
                }
            )
         //   console.log(response.data.name)
            this.setState({
                isLoaded: true,
                user: response.data
            })
        } catch (e) {
            alert(e)

            console.log(e)
            this.setState({
                isLoaded: true,
                e
            });
        }
    }

    setModalShow(show:boolean){
        this.setState({
            show:show,
        });
    }


    public render() {
        const localState: any = this.state;
        localStorage.setItem('path','/article/liked')
        if (localState.error) {
            return <div>Error: {localState.error!.message}</div>;
        }  else {
            return (
                <>
                <Navbar history={history}/>
                <div className="container">

                    <div className="row">
                        <div className={"col-md-3"}>
                        <Menu history={history}/>
                        </div>
                            <div className={"col-md-9"}>
                                <div className="row">
                                    <UserItem key={localState.user.id} user={localState.user}/>
                                    <div className="pt-4 col-md-6">
                                        <Button onClick={() => this.setModalShow(true)} variant="primary">Изменить информацию о себе</Button>
                                        <MyVerticallyCenteredModal
                                            show={localState.show}
                                            onHide={() => this.setModalShow(false)}
                                        />
                                    </div>

                                </div>
                                <div className="row mt-5">
                                    <h3>Активность</h3>
                                </div>
                                <div className="row mt-2">

                                    <ArticleList />
                                </div>
                            </div>
                    </div>


                </div>
                    </>
            );
        }
    }
}

interface IPropsUser{
    onHide:()=>void,
    show:boolean
}


function MyVerticallyCenteredModal (props:IPropsUser) {

    const addNews= async ({name,surname,login,patronymic,tel}:{name:string,patronymic:string, login:string,tel:string, surname:string})=>{
        // console.log(article)

        await axios.put(
            BASE + '/user/update',
            {
                id: Auth.getUserId(),
                name: name,
                surname: surname,
                login: login,
                patronymic: patronymic,
                tel: tel,
                img_avatar: preview,
                headers: {
                    authorization: "Bearer " + Auth.getUserJWT(),
                },
            }
        )
        props.onHide()
        window.location.reload()


    }


    const uploadImage = async (e:any)=>{
        const file = e.target.files[0]
        const base64 = await convertBase64(file);
        setPreview(base64);
        console.log(preview)
    }

    const convertBase64 = (file:any):Promise<string|null|ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

        });
    };

    const [tel, setTel] = useState('')
    const [login, setLogin] = useState('')
    const [name,setName]=useState('')
    const [surname,setSurname]=useState('')
    const [patronymic,setPatronymic]=useState('')
    const [preview, setPreview] = useState<string|null|ArrayBuffer>('')
    const {register, handleSubmit, formState: { errors }, setValue} = useForm();

    useEffect(()=>{
        async function  fetchStates(){
            const response =await axios.get('http://localhost:3001/api/user/information',{params:{
                    "id":Auth.getUserId(),
                }})
            console.log(response.data)
            setName(response.data[0])
            setSurname(response.data[1])
            setLogin(response.data[2])
            setPatronymic(response.data[3])
            setTel(response.data[4])
            setPreview(response.data[5])

        }
        fetchStates()
    },[])




    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Заполните дополнительную информацию про вас
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(addNews)}>
                <Modal.Body>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Логин</Form.Label>
                        <Form.Control type="text"  defaultValue={login} placeholder=""  { ...register("login", {required: 'Обязательное поле для заполнения'})}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control type="text"  defaultValue={name} placeholder=""  { ...register("name", {required: 'Обязательное поле для заполнения'})}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control type="text"  defaultValue={surname} placeholder=""  { ...register("surname", {required: 'Обязательное поле для заполнения'})}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Отчество</Form.Label>
                        <Form.Control type="text"  defaultValue={patronymic} placeholder=""  { ...register("patronymic", {required: 'Обязательное поле для заполнения'})}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control type="text"  defaultValue={tel} placeholder=""  { ...register("tel", {required: 'Обязательное поле для заполнения'})}/>
                    </Form.Group>
                    <Form.Group>
                        <label htmlFor="exampleControlsFile1">Выбирите аватар</label>
                        <Form.File  id="exampleControlsFile1"  onChange={(e:any)=>{
                            uploadImage(e)
                        }}/>

                    </Form.Group>
                    <img className={"preview"} src={"" + preview}  alt=""/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Закрыть</Button>
                    <Button variant="primary" onClick={function(event){
                        props.onHide(); }} type="submit">
                        Применить
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}