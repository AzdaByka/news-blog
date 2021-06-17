import React, {Component, useEffect, useState} from 'react';
import {IArticle} from '../../../types/articles';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {Link, Route, Switch, withRouter} from "react-router-dom";
import ArticleItem from "../../../components/article/ArticleItem";
import axios from "axios";
import './statisticsPublicationPage.css'
import {findAllByDisplayValue} from "@testing-library/react";
import { ArticleList } from '../../../components/article/ArticleList';
import  {Menu}  from '../../../components/Menu/Menu';
import history from '../../../constants/history'
import ExcelImg from '../../../stylesheets/imgs/excel.png'



import {
    ARTICLE_CREATE,
    BASE,
    HOME,
    ME,
    STATISTICS_AUDITORIUM,
    STATISTICS_PUBLICATION,
    STATISTICS_PUBLICATION_EXPORT
} from "../../../constants/routes";
import {NavbarEditor} from "../../../components/Navbars/NavbarEditor/NavbarEditor";
import {IUser} from "../../../types/user";
import Auth from "../../../connection/auth";
import {BigFooter} from "../../../components/Footer/BigFooter/BigFooter";
import { ExportCSV } from '../../../components/ExportExcel/ExportExcel';
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

const FileDownload = require('js-file-download');


export interface IAppProps {
    error: any;
    isLoaded: false;
    statistics:[]
    total:[]
    statisticsExport:[]
}

export default class StatisticPublicationPage extends Component{

    constructor(props: IAppProps) {
        super(props);
        this.state = {
            error: '',
            statistics:[],
            total:[],
            statisticsExport:[]
        };
    }

    async componentDidMount() {
        try {

            const response = await axios.get(
                BASE+STATISTICS_PUBLICATION,
                {
                    params:{
                        "id":Auth.getUserId()
                    },
                    headers:{
                        authorization:"Bearer "+Auth.getUserJWT(),
                    },
                }
            )
            const totalRes=response.data[response.data.length-1]
            let totalResExport=totalRes.slice()
            response.data.pop()
            let statisticExport=response.data.slice()
            totalResExport.unshift("Итого")
            const statistic=response.data
            statisticExport.unshift(totalResExport)
            console.log(statistic)
            console.log(totalRes)
            this.setState({
                isLoaded: true,
                statistics: statistic,
                total:totalRes,
                statisticsExport:statisticExport
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



    exportToCSV = (csvData: any[], fileName: string) => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const arrayForExport: any[] = []
        csvData.forEach((ad) => {
            var object = {
                "Дата": ad[0],
                "Заголовок": ad[1],
                "CTR": ad[2],
                "Показы": ad[3],
                "Комментарии": ad[4],
                "Подписки": ad[5],
            }
            arrayForExport.push(object)
        });


        console.log(arrayForExport);
        const ws = XLSX.utils.json_to_sheet(arrayForExport);
        const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});


        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    public render() {

        const localState: any = this.state;
        const last=localState.statistics.length
        const border='none'
        if (localState.error) {
            return <div>Error: {localState.error!.message}</div>;
        }  else {
            localStorage.setItem('path','/editor')
            return (
                <>
                    <NavbarEditor history={history}/>

                    <div className={"container mt-4"}>
                        <div className="row">
                        <h2>Статистика</h2>
                        </div>
                        <div className="row m-3">
                            <div className=" col-2">
                                <Link  to={STATISTICS_PUBLICATION} >
                                <span className={'linkColor'}>
                                Публикации
                                    </span>
                                </Link>

                            </div>
                            <div  className=" col-2">
                                <Link  to={STATISTICS_AUDITORIUM} >
                                    <span className={'linkColor'}>
                                Аудитория канала
                                            </span>

                                </Link>

                        </div>
                            <div className="col-6">
                            </div>
                            <div  onClick={()=>this.exportToCSV(localState.statisticsExport,'Статистика')} className="col-2">
                                <img src={ExcelImg} alt=""/>
                                Скачать отчет
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-2 p-0 m-0">
                                <hr className={'hrChecked'} color={"red"} />
                            </div>
                            <div className="col-2 p-0 m-0">
                                <hr className={'hrChecked'} color={"#C4C4C4"} />
                            </div>
                            <div className="col-8 p-0 m-0">
                                <hr className={'hrChecked'} color={"#C4C4C4"} />
                            </div>
                        </div>
                        <div className="row mainRow mt-3 p-1">
                            <div className="col-md-2">
                                Дата
                            </div>
                            <div className="col-md-4">
                                Заголовок
                            </div>
                            <div className="col-md-1">
                                CTR
                            </div>
                            <div className="col-md-1">
                               Показы
                            </div>
                            {/*<div className="col-md-2">*/}
                            {/*    Комментарии*/}

                            {/*</div>*/}
                            <div className="col-md-1">
                                Подписки

                            </div>
                            <div className="col-md-1">
                                Лайки

                            </div>
                        </div>
                        <hr />
                        <div className="row resultRow mt-3 p-1">
                            <div className="col-md-2">
                                Итого
                            </div>
                            <div className="col-md-4">
                                {last} Статей
                            </div>
                            <div className="col-md-1">
                                {String(localState.total[0]).slice(0,4)}
                            </div>
                            <div className="col-md-1">
                                {localState.total[1]}
                            </div>
                            {/*<div className="col-md-2">*/}
                            {/*    {localState.total[2]}*/}
                            {/*</div>*/}
                            <div className="col-md-1">
                                {localState.total[3]}
                            </div>
                            <div className="col-md-1">
                                {localState.total[4]}
                            </div>
                        </div>
                        <table style={{display: "none"}} id="tblData">
                            <tr>
                                <th>Date</th>
                                <th>CTR</th>
                                <th>  Shows</th>
                                <th>  Comment</th>
                                <th>  Subscriptions</th>
                                <th>  Likes</th>
                            </tr>
                            <tr>
                                <td>Result</td>
                                <td>{last} Article</td>
                                <td>  {localState.total[1]}</td>
                                <td>  {localState.total[2]}</td>
                                <td>  {localState.total[3]}</td>
                                <td>  {localState.total[4]}</td>
                            </tr>
                        {localState.statistics.map((article: any)=>

                            <tr>
                                <td> {article[0].slice(0,10)}</td>
                                <td>  { String(article[2])}</td>
                                <td> {article[3]} </td>
                                <td>   0</td>
                                <td>      {article[4]}</td>
                                <td>     {article[5]}</td>
                            </tr>
                        )}</table>

                        {localState.statistics.map((article: any)=>
                            <>

                           <hr />
                        <div className="row pt-1 pb-1" style={{border:border}}>
                            <div className="col-md-2">
                                {article[0].slice(0,10)}
                            </div>
                            <div className="col-md-4">
                                {article[1]}
                            </div>
                            <div className="col-md-1">
                                { String(article[2]).slice(0,4)}
                            </div>
                            <div className="col-md-1">
                                {article[3]}
                            </div>
                            {/*<div className="col-md-2">*/}
                            {/*    0*/}

                            {/*</div>*/}
                            <div className="col-md-1">
                                {article[4]}

                            </div>
                            <div className="col-md-1">
                                {article[5]}

                            </div>

                        </div>

                            </>
                            )}


                    </div>
                    <BigFooter/>

                </>
            );
        }
    }



     async exportTableToExcel(tableID:any, filename = ''){
        var downloadLink;
        var dataType = 'application/vnd.ms-excel;charset=UTF-8';
        var tableSelect = document.getElementById(tableID);
        var tableHTML = tableSelect?.outerHTML.replace(/ /g, '%20');

        // Specify file name
        filename = filename?filename+'.xlsx':'excel_data.xlsx';

        // Create download link element
        downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if(navigator.msSaveOrOpenBlob&&tableHTML){
            var blob = new Blob(['\ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob( blob, filename);
        }else{
            // Create a link to the file
            const loh= 'data:' + dataType + ', ' + tableHTML;
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
            downloadLink.target='_blank'
            // Setting the file name
            downloadLink.download = filename;
            downloadLink.onclick=()=>{return !window.open(loh)}
            //triggering the function
            downloadLink.click();
            document.body.removeChild(downloadLink)
        }
    }

}
