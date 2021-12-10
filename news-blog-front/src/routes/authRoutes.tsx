import {HOME, EDITOR, ARTICLE, SIGN_IN, SIGN_OUT, ME, SIGN_UP} from '../constants/routes';

export interface Route {
    id: number;
    path: string;
    description: string;
    idTest: string;
}

export const AuthRoutes: Route[] = [
    {
        id: 1,
        path: ME,
        description: 'Профиль',
        idTest:"profile",
    },
    {
        id: 2,
        path: EDITOR,
        description: 'Мой канал',
        idTest:"channel",
    },
];

export const NonAuthRoutes: Route[] = [

    {
        id: 3,
        path: SIGN_IN,
        description: 'Sign In',
        idTest:"login",
    },
    {
        id: 4,
        path: SIGN_UP,
        description: 'Sign Up',
        idTest:"SignUp",
    }
];