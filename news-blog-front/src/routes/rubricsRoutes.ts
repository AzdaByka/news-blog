
import { HOME, TOP, CARS, CORONA, TRAVEL, SCIENCE, MOVIE, ARTICLE} from '../constants/routes';
import { ArticlePage } from '../pages/article/articlePage'
import { SignIn } from '../components/SignIn';
import CircleImg from '../stylesheets/imgs/circle.png'
import HomeImg from '../stylesheets/imgs/Home.png'

export interface RubricRoute {
    id: number;
    path: string;
    description: string;
    img:any
}


export const Rubrics: RubricRoute[] = [
    {
        id: 1,
        path: HOME,
        description: 'Лента',
        img:HomeImg
    },
    // {
    //     id: 2,
    //     path: TOP,
    //     description: 'TOP',
    // },
    {
        id: 3,
        path: MOVIE,
        description: 'Кино',
        img:CircleImg,
    },
    {
        id: 4,
        path: TRAVEL,
        description: 'Путешествия',
        img:CircleImg,
    },
    {
        id: 5,
        path: SCIENCE,
        description: 'Наука',
        img:CircleImg,
    },
    {
        id: 6,
        path: CORONA,
        description: 'Коронавирус',
        img:CircleImg,
    },
    {
        id: 7,
        path: CARS,
        description: 'Авто',
        img:CircleImg,
    },
];