import React from 'react'
import { Navbar, Container, NavbarBrand } from 'react-bootstrap';



export class LittleFooter extends React.Component {
    render() {
        return (
            <div className="mt-4">
                <hr/>
                <footer className='container col-7'>
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
                </footer>
            </div>
        );
    }
}