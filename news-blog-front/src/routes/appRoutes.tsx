
import {
    EDITOR,
    HOME,
    SIGN_UP,
    SIGN_IN,
    ARTICLE_DETEiLED,
    ARTICLE,
    SIGN_OUT,
    ARTICLE_CREATE,
    MOVIE,
    TOP,
    TRAVEL, SCIENCE, CORONA, CARS, ME
} from '../constants/routes';
import { ArticlePage } from '../pages/article/articlePage'
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp/index';
import {SignOutButton} from "../components/SignOutButton/SignOutButton";
import {AccountPage} from "../pages/user/accountPage";
import { ArticleCreatePage } from '../pages/article/articleCreatePage'
import  ArticleItemPage  from '../pages/article/articleItemPage'
import {EditorChannelPage} from "../pages/сhannel/editorChannelPage";


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
    {
        path: TOP,
        component: ArticlePage,
        exact: true
    },
    {
        path: MOVIE,
        component: ArticlePage,
        exact: true
    },
    {
        path: TRAVEL,
        component: ArticlePage,
        exact: true
    },
    {
        path: SCIENCE,
        component: ArticlePage,
        exact: true
    },
    {
        path: CORONA,
        component: ArticlePage,
        exact: true
    },
    {
        path: CARS,
        component: ArticlePage,
        exact: true
    },
    {
        path: SIGN_IN,
        component: SignIn,
        exact: true
    },
    {
        path: SIGN_UP,
        component: SignUp,
        exact: true
    },
    {
        path: ME,
        component: AccountPage,
        exact: true
    },
    {
        path: EDITOR,
        component: EditorChannelPage,
        exact: true
    },
    {
        path: ARTICLE_CREATE,
        component: ArticleCreatePage,
        exact: true
    },
    {
        path: ARTICLE_DETEiLED,
        component: ArticleItemPage,
        exact: true
    },
];