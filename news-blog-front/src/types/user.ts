

export interface IUser{
    id: string;
    email: string;
    name: string;
    avatar:string;
}

// export interface IUserHash{
//     [key: string]: IUser;
// }
//
// export default class User implements IUser{
//     public email: string;
//     public name: string;
//     public id: string;
//
//     constructor(user: Firebase.User){
//         this.id = user.uid;
//         this.email = user.email || '';
//         this.name = user.displayName || '';
//     }
// }


export interface UserState {
    users: IUser[];
    loading: boolean;
    error: null | string;
}
export enum UserActionTypes {
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_ERROR = 'FETCH_USERS_FETCH_USERS_ERROR',
}
interface FetchUsersAction {
    type: UserActionTypes.FETCH_USERS;
}
interface FetchUsersSuccessAction {
    type: UserActionTypes.FETCH_USERS_SUCCESS;
    payload: any[]
}
interface FetchUsersErrorAction {
    type: UserActionTypes.FETCH_USERS_ERROR;
    payload: string;
}
export type UserAction = FetchUsersAction | FetchUsersErrorAction | FetchUsersSuccessAction