
import {  ACCOUNT,  HOME, SIGN_UP, SIGN_IN,  ARTICLE_DETEiLED, ARTICLE } from '../constants/routes';
import { ArticlePage } from '../pages/articlePage'

export interface AppRoute {
    path: string;
    component: any;
    exact: boolean;
}
export const AppRoutes: AppRoute[] = [
    {
        path: HOME,
        component: ArticlePage,
        exact: true
    },

];