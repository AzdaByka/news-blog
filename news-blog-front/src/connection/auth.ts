import Cookies from "universal-cookie"
import axios from "axios";
import {IUser} from "../types/user"
import {BASE, SIGN_IN} from "../constants/routes"
const cookie = new Cookies()

class Auth {

     async login(login : string, password : string) {
        try {
            const response = await axios.post(BASE + SIGN_IN, {
                login: login,
                password: password,
            });
            cookie.set('user', JSON.stringify(response.data.token))
            console.log(response.data.token)
        }

        catch (error) {
            return error;

        }
    }

    async logout() {
        cookie.set('user', '')
    }

    register(username : string, email : string, password : string) {

    }

    isAuth() : boolean{
        return cookie.get('user');
    }

    getUserJWT():string{
         return cookie.get('user');
    }

    // public getUser() : IUser{
    //     const data = CookieService.get('user');
    //     console.log(data)
    //     return data;
    // }
}

export default new Auth();