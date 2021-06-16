
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
    TRAVEL, SCIENCE, CORONA, CARS, ME, STATISTICS_AUDITORIUM, STATISTICS_PUBLICATION, SEARCH
} from '../constants/routes';
import { ArticlePage } from '../pages/article/articlePage'
import { SignIn } from '../components/SignIn';
import { SignUp } from '../components/SignUp/index';
import {SignOutButton} from "../components/SignOutButton/SignOutButton";
import {AccountPage} from "../pages/user/accountPage";
import { ArticleCreatePage } from '../pages/article/articleCreatePage'
import  StatisticsPublicationPage  from '../pages/statistics/publication/statisticsPublicationPage'
import  ArticleItemPage  from '../pages/article/articleItemPage'
import {EditorChannelPage} from "../pages/сhannel/editorChannelPage";
import StatisticsAuditoriumPage from "../pages/statistics/auditorium/statisticsAuditoriumPage";


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
    {
        path: STATISTICS_AUDITORIUM,
        component: StatisticsAuditoriumPage,
        exact: true
    },
    {
        path: STATISTICS_PUBLICATION,
        component: StatisticsPublicationPage,
        exact: true
    },
    {
        path: SEARCH,
        component: ArticlePage,
        exact: true
    },
];