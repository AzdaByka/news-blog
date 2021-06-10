import React, {Component, useEffect, useState} from 'react';
import {IArticle} from '../../types/articles';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ArticleItem from "../../components/article/ArticleItem";
import axios from "axios";
import './articleCreatePage.css'
import {findAllByDisplayValue} from "@testing-library/react";
import { ArticleList } from '../../components/article/ArticleList';
import  {Menu}  from '../../components/Menu/Menu';
import history from '../../constants/history'
import {Navbar} from "../../components/Navbar/Navbar";
import {Button, Form, FormControl, InputGroup, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {BASE} from "../../constants/routes";
import Auth from "../../connection/auth";


export interface IAppProps {
    error: any;
    isLoaded: false;
    body:string
    show:boolean

}

export class ArticleCreatePage extends Component{

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            error: '',
            body:'',
            show:false,
        };
    }


    handleBody = (e: ((prevState: string) => string) | string) => {
        this.setState({
            body:e,
        });
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
            return (
                <div>

                    <button type="button" className="btn btn-primary btnPublish" onClick={() => this.setModalShow(true)}>Опубликовать</button>
                    <MyVerticallyCenteredModal
                        show={localState.show}
                        onHide={() => this.setModalShow(false)}
                    />

                <div className={"container"}>

                    <div className={"row"}>
                        <div className={"col-md-1"}>
                        Стрелочка назад
                    </div>
                        <div className={"col-md-11"}>


                        <ReactQuill
                            placeholder="Текст статьи"
                            onChange={this.handleBody}
                            value={localState.body}
                        />
                        </div>
                    </div>
                </div>
                </div>


            );
        }
    }
}

interface IProps{
    onHide:()=>void,
    show:boolean

}




function MyVerticallyCenteredModal(props:IProps) {

    const addNews= async ({title,rubrics,preview}:{title:string,rubrics:[],preview:string})=>{
        const article={
            title:title,
            rubrics:rubrics,
            preview:preview,
        }
        console.log(article)
        // const response = await axios.post<IArticle[]>(
        //     BASE+localStorage.getItem('path'),
        //     article,
        //     {
        //         headers: {
        //             authorization: "Bearer " + Auth.getUserJWT(),
        //         },
        //     }
        //
        //
        // )
        // const response =await axios.get<IArticle[]>('http://localhost:3001/api/article',{params:{
        //         ids:'1'
        //     }})
    }
    const [title, setTitle] = useState('')
    const [rubrics, setRubrics] = useState([])
    const [preview, setPreview] = useState('')
    const {register, handleSubmit, formState: { errors }, setValue} = useForm();
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Заполните дополнительную информацию про статью
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(addNews)}>
            <Modal.Body>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Заголовок статьи</Form.Label>
                    <Form.Control type="text" placeholder=""  { ...register("title", {required: 'Обязательное поле для заполнения'})}/>
                    <Form.Text className="text-muted"  >
                        Не делайте слишком клик-бэйтные заголовки
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Выберите рубрики</Form.Label>
                    <Form.Control as="select" multiple { ...register("rubrics", {required: 'Обязательное поле для заполнения'})}>
                        <option>Кино</option>
                        <option>Путешествия</option>
                        <option>Наука</option>
                        <option>Коронавирус</option>
                        <option>Авто</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <label htmlFor="exampleControlsFile1">Выбирите preview</label>
                    <Form.File id="exampleControlsFile1" { ...register("preview", {required: 'Обязательное поле для заполнения'})}/>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button variant="primary" onClick={props.onHide} type="submit">
                    Submit
                </Button>
            </Modal.Footer>
            </Form>
        </Modal>
    );
}