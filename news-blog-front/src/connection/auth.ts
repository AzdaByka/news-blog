import Cookies from "universal-cookie"
import axios from "axios";
import {IUser} from "../types/user"
import {BASE, SIGN_IN, SIGN_UP} from "../constants/routes"
const cookie = new Cookies()

class Auth {

     async login(login : string, password : string) {
        try {
            const response = await axios.post(BASE + SIGN_IN, {
                login: login,
                password: password,
            });
            cookie.set('user', JSON.stringify(response.data.token))
            cookie.set('userId', JSON.stringify(response.data.id))
            console.log(response.data.token)
        }

        catch (error) {
            return error;

        }
    }

    async logout() {
        cookie.set('user', '')
    }

    async register(login : string, email : string, password : string,avatar:string,
             tel:string, name:string,surname:string,patronymic:string) {
        try {
            const response = await axios.post(BASE + SIGN_UP, {
                login: login,
                email:email,
                password: password,
                name:name,
                surname:surname,
                patronymic:patronymic,
                tel:tel,
                img_avatar:avatar

            });
            await this.login(login, password)
            // cookie.set('user', JSON.stringify(response.data.token))
            // cookie.set('userId', JSON.stringify(response.data.id))
            // console.log(response.data.token)
        }

        catch (error) {
            return error;

        }

    }

    isAuth() : boolean{
        return cookie.get('user');
    }

    getUserJWT():string{
         return cookie.get('user');
    }

    getUserId():string{
        return cookie.get('userId');
    }

    // public getUser() : IUser{
    //     const data = CookieService.get('user');
    //     console.log(data)
    //     return data;
    // }
}

export default new Auth();