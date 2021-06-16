import React, {Component} from 'react';
import {IUser} from '../../types/user';
import history from '../../constants/history';
import {Image} from "react-bootstrap";
import {IChannel} from "../../types/Channel";
import axios from "axios";
import Auth from "../../connection/auth";
interface IProps {
    channel:any
}
export default class UserItem extends Component<IProps> {
    constructor(props:IProps) {
        super(props);
        this.setState({
            channel:null
        })
    }

    // async componentDidMount() {
    //     const response =await axios.get<IChannel>('http://localhost:3001/api/channel/information',{params:{
    //             "id":Auth.getUserId(),
    //         }})
    //     this.setState({
    //         channel:response.data
    //     })
    // }

    public render() {
        const channel=this.props.channel
       // console.log(channel)
        return (
            <div className="User col-md-6" >

                <Image  width={'100px'} height={'100px'} roundedCircle src={channel[2]} alt="Logo"/>
                <div className="mt-0 ml-5 d-inline-block">
                    <div className="">
                       <b>{channel[0]}</b>

                    </div>
                    <div className="">
                        {channel[3]} подписчик
                    </div>
                </div>

            </div>
        );
    }
}
