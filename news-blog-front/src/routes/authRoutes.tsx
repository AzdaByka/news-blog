import { HOME, ACCOUNT,ARTICLE, SIGN_IN,SIGN_OUT } from '../constants/routes';

export interface Route {
    id: number;
    path: string;
    description: string;
}

export const AuthRoutes: Route[] = [
    {
        id: 1,
        path: ACCOUNT,
        description: 'Account',
    },
];

export const NonAuthRoutes: Route[] = [

    {
        id: 3,
        path: SIGN_IN,
        description: 'Sign In'
    }
];