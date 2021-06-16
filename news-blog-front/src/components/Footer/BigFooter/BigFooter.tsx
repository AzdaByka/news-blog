import React from 'react'
import { Navbar, Container, NavbarBrand } from 'react-bootstrap';
import './BigFooter.css'


export class BigFooter extends React.Component {
    render() {
        return (
            <div className="fixed-bottom">
                <hr/>
                <Navbar className='container col-7'>
                    <div className='container col justify-content-center'>
                        Рекламодателям
                    </div>
                    <div className='container col justify-content-center'>
                        О сервисе
                    </div>
                    <div className='container col justify-content-center'>
                        Помощь
                    </div>
                    <div className='container col justify-content-center'>
                        Текущая версия v.1
                    </div>
                </Navbar>
            </div>
        );
    }
}