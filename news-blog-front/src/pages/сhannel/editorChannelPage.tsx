import React, {Component, useEffect, useState} from 'react';
import {IArticle} from '../../types/articles';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {Link, Route, Switch, withRouter} from "react-router-dom";
import ArticleItem from "../../components/article/ArticleItem";
import axios from "axios";
import './editorChannelPage.css'
import {findAllByDisplayValue} from "@testing-library/react";
import { ArticleList } from '../../components/article/ArticleList';
import  {Menu}  from '../../components/Menu/Menu';
import history from '../../constants/history'
import {ARTICLE_CREATE, BASE, HOME} from "../../constants/routes";
import {NavbarEditor} from "../../components/Navbars/NavbarEditor/NavbarEditor";
import {LittleFooter} from "../../components/Footer/LittleFooter/LittleFooter";
import plusImg from '../../stylesheets/imgs/plus.png'
import Auth from "../../connection/auth";
import {useForm} from "react-hook-form";
import {Button, Form, Modal} from "react-bootstrap";



export interface IAppProps {
    error: any;
    isLoaded: false;
    body:string
    auditorium:string
    name:string,
    subscribers:string
}

export class EditorChannelPage extends Component{

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            error: '',
            body:'',
            auditorium:'',
            subscribers:'',
            name:''
        };
    }

    async componentDidMount() {
        const response =await axios.get('http://localhost:3001/api/channel/information',{params:{
                "id":Auth.getUserId(),
            }})
        this.setState({
            name:response.data[0],
            subscribers:response.data[3],
            auditorium:response.data[6]
        })
    }


    setModalShow(show:boolean){
        this.setState({
            show:show,
        });
    }

    public render() {

        const localState: any = this.state;
        if (localState.error) {
            return <div>Error: {localState.error!.message}</div>;
        }  else {
            localStorage.setItem('path','/editor')
            return (
                <>
                <NavbarEditor history={history}/>

                <div className={"container"}>
                    <div className="row">
                        <div className={"col-md-3"}>
                    <div className={"row"}>
                        <div className={"col-md-12"}>
                            <div className={"row"}>
                            <div className="Article col-md-12" >
                                <div className={"row  p-3 py-1"}>
                                <div className=" ml-3">
                                    <h3 className={'text-center'}>{localState.name}</h3>
                                </div>
                                </div>
                                    <div className={"row pl-2 py-1"}>
                                <div className={"col-6 text-center sign"}>{localState.subscribers}</div>
                                <div className={"col-6 text-center sign"}>{localState.auditorium!=0?localState.auditorium:0}</div>
                                    </div>
                                        <div className={"row pl-3 py-1"}>
                                <div className={"col-6 sign"}>Подписчики</div>
                                <div className={"col-6 sign"}>Аудитория</div>
                                        </div>
                                <div className={"row ml-3 py-1 "}>
                                    <Button className={"btnCustom"} onClick={() => this.setModalShow(true)} variant="primary">Настроить канал</Button>

                                    {/*<button type="button" className={"btn btn-primary btnCustom"}>*/}
                                    {/*    Настроить канал</button>*/}
                                    <MyVerticallyCenteredModal
                                        show={localState.show}
                                        onHide={() => this.setModalShow(false)}
                                    />

                                </div>
                                </div>

                            </div>
                        </div>



                    </div>
                            <LittleFooter/>
                        </div>
                        <div className={"col-md-9 pl-5"}>
                            <div className={"row"}>
                                <h2 className={"ml-5 d-inline"}>Публикации</h2>
                                <Link to={ARTICLE_CREATE} className="btn btn-primary d-inline ml-5" >
                                    <img src={plusImg}  aria-hidden="true" alt=""/>

                                    Создать
                                </Link>
                            </div>
                            <ArticleList editor={true}/>
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

    const addNews= async ({name,description}:{name:string,description:string})=>{
        // console.log(article)

        await axios.put(
            BASE + '/channel/update',
            {
                id: channelId,
                name: name,
                description: description,
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

    const [channelId,setChannelId]= useState('')
    const [description, setDescription] = useState('')
    const [name,setName]=useState('')
    const [preview, setPreview] = useState<string|null|ArrayBuffer>('')
    const {register, handleSubmit, formState: { errors }, setValue} = useForm();

    useEffect(()=>{
        async function  fetchStates(){
            const response =await axios.get('http://localhost:3001/api/channel/information',{params:{
                    "id":Auth.getUserId(),
                }})
            console.log(response.data)
            setName(response.data[0])
            setDescription(response.data[1])
            setPreview(response.data[2])
            setChannelId(response.data[4])

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
                    Заполните дополнительную информацию про канал
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(addNews)}>
                <Modal.Body>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Название</Form.Label>
                        <Form.Control type="text"  defaultValue={name} placeholder=""  { ...register("name", {required: 'Обязательное поле для заполнения'})}/>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Описание</Form.Label>
                        <Form.Control type="text"  defaultValue={description} placeholder=""  { ...register("description", {required: 'Обязательное поле для заполнения'})}/>
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