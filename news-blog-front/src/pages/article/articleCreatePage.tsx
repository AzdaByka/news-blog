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
import {Button, Modal} from "react-bootstrap";



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
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}