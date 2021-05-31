import { HOME, ACCOUNT,ARTICLE, SIGN_IN } from '../constants/routes';

export interface Route {
    id: number;
    path: string;
    description: string;
}

export const AuthRoutes: Route[] = [
    {
        id: 1,
        path: HOME,
        description: 'Home',
    },
    {
        id: 2,
        path: ACCOUNT,
        description: 'Account',
    },
    {
        id: 3,
        path: ARTICLE,
        description: 'News control panel',
    },
];

export const NonAuthRoutes: Route[] = [

    {
        id: 4,
        path: SIGN_IN,
        description: 'Sign In'
    }
];