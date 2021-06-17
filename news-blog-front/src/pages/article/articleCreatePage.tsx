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
import {Navbar} from "../../components/Navbars/NavbarMain/Navbar";
import {Button, Form, FormControl, InputGroup, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {BASE, EDITOR, HOME} from "../../constants/routes";
import Auth from "../../connection/auth";
import {ICategory} from "../../types/category";
import BackImg from '../../stylesheets/imgs/back.png'



export interface IAppProps {
    error: any;
    isLoaded: false;
    body:string
    show:boolean

}

interface IState{
    title:string;
    rubrics:ICategory[];
    preview:string;
    id:string;
    shortDescription:string
    update:boolean
}

export class ArticleCreatePage extends Component{

    constructor(props: IAppProps,states:IState) {
        super(props,states);
        this.state = {
            error: '',
            body:'',
            show:false,
            id:'',
            title:"",
            rubrics:[],
            preview:'',
            shortDescription:'',
            update:false
        };
    }

    async componentDidMount() {
        if (localStorage.getItem('articleId')!==''){
            try{


                const response =await axios.get<IArticle>('http://localhost:3001/api/articleById',{params:{
                        "id":localStorage.getItem('articleId'),
                        "flag":false
                    }})
                //console.log(response.data.categories)
                this.setState({
                    body:response.data.text,
                    title:response.data.title,
                    id:localStorage.getItem('articleId'),
                    rubrics:response.data.categories,
                    preview:response.data.imgs,
                    shortDescription:response.data.shortDescription,
                    update:true

                });
            }
            catch (e){
                alert(e)
            }

        }
        localStorage.setItem('articleId','')
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

    backOnEditor(){
        history.push(EDITOR);
    }

    public render() {
        const localState: any = this.state;
        if (localState.error) {
            return <div>Error: {localState.error!.message}</div>;
        }  else {
            return (
                <>
                <Navbar history={history}/>
                <div className={"container-fluid "}>

                    <button type="button" className="btn btn-primary btnPublish" onClick={() => this.setModalShow(true)}>Опубликовать</button>
                    <MyVerticallyCenteredModal
                        show={localState.show}
                        onHide={() => this.setModalShow(false)}
                        text={localState.body}
                        rubrics={localState?.rubrics}
                        title={localState?.title}
                        shortDescription={localState?.shortDescription}
                        preview={localState?.preview}
                        update={localState.update}
                        id={localState.id}
                    />

                <div className={"container"}>

                    <div className={"row"}>
                        <div className={"col-md-1"}>
                            <img onClick={this.backOnEditor} src={BackImg} alt=""/>
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
                </>

            );
        }
    }
}

interface IProps{
    onHide:()=>void,
    show:boolean
    id?:string
    text:string
    title:string;
    rubrics:ICategory[];
    preview:string;
    shortDescription:string
    update:boolean
}




function MyVerticallyCenteredModal (props:IProps) {

    const addNews= async ({title,rubrics,shortDescription}:{title:string,rubrics:[],shortDescription:string})=>{
       // console.log(article)
        if (!props.update) {
             await axios.post<IArticle[]>(
                BASE + '/articleAdd',
                {
                    id: Auth.getUserId(),
                    text: text,
                    title: title,
                    rubrics: rubrics,
                    preview: preview,
                    shortDescription: shortDescription,
                    headers: {
                        authorization: "Bearer " + Auth.getUserJWT(),
                    },
                }
            )
        }
        else {
            await axios.put<IArticle[]>(
                BASE + '/article/update',
                {
                    id: props.id,
                    text: text,
                    title: title,
                    rubrics: rubrics,
                    preview: preview,
                    shortDescription: shortDescription,
                    headers: {
                        authorization: "Bearer " + Auth.getUserJWT(),
                    },
                }
            )
        }
        history.push(EDITOR);
        // const response =await axios.get<IArticle[]>('http://localhost:3001/api/article',{params:{
        //         ids:'1'
        //     }})
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

    const [text, setText] = useState('')
    const [title,setTitle]=useState('')
    const [shortDescription,setShortDescription]=useState('')
    const [rubrics,setRubrics]=useState<string[]>([])
    const [preview, setPreview] = useState<string|null|ArrayBuffer>('')
    const {register, handleSubmit, formState: { errors }, setValue} = useForm();

    useEffect(()=>{
        async function  fetchStates(){
            setPreview(props.preview)
            setText(props.text)

        }
        fetchStates()
    },[props.preview, props.text])

    const isSelected=(rubric:string):boolean=>{
        if (props.rubrics!=null)
        for (const rub of props.rubrics)
        {
            if (rub.name===rubric)
                return true
            //console.log(props.rubrics+"dfdsfdsfsdfdsfs")
        }

        return false
    }



    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className={'fontStyle'} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Заполните дополнительную информацию про статью
                </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(addNews)}>
            <Modal.Body className={'fontStyle'}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Заголовок статьи</Form.Label>
                    <Form.Control type="text"  defaultValue={props.title} placeholder=""  { ...register("title", {required: 'Обязательное поле для заполнения'})}/>
                    <Form.Text className="text-muted"  >
                        Не делайте слишком клик-бэйтные заголовки
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Короткое описание</Form.Label>
                    <Form.Control as="textarea" defaultValue={props.shortDescription} rows={3} { ...register("shortDescription", {required: 'Обязательное поле для заполнения'})}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Рубрики</Form.Label>
                    <Form.Control as="select"   multiple { ...register("rubrics", {required: 'Обязательное поле для заполнения'})}>
                        <option selected={isSelected('Кино') }>Кино</option>
                        <option selected={isSelected('Путешествия')}>Путешествия</option>
                        <option selected={isSelected('Наука')}>Наука</option>
                        <option selected={isSelected('Коронавирус')}>Коронавирус</option>
                        <option selected={isSelected('Авто')}>Авто</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <label htmlFor="exampleControlsFile1">Выбирите preview</label>
                    <Form.File  id="exampleControlsFile1"  onChange={(e:any)=>{
                        uploadImage(e)
                    }}/>

                </Form.Group>
                <img className={"preview"} src={"" + preview}  alt=""/>
            </Modal.Body>
            <Modal.Footer className={'fontStyle'}>
                <Button onClick={props.onHide}>Закрыть</Button>
                <Button variant="primary" onClick={function(event){
                    props.onHide(); }} type="submit">
                   Опубликовать
                </Button>
            </Modal.Footer>
            </Form>
        </Modal>
    );
}