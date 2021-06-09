
import { HOME, TOP, CARS, CORONA, TRAVEL, SCIENCE, MOVIE, ARTICLE} from '../constants/routes';
import { ArticlePage } from '../pages/article/articlePage'
import { SignIn } from '../components/SignIn';


export interface RubricRoute {
    id: number;
    path: string;
    description: string;
}


export const Rubrics: RubricRoute[] = [
    {
        id: 1,
        path: HOME,
        description: 'Лента',
    },
    {
        id: 2,
        path: TOP,
        description: 'TOP',
    },
    {
        id: 3,
        path: MOVIE,
        description: 'Кино',
    },
    {
        id: 4,
        path: TRAVEL,
        description: 'Путешествия',
    },
    {
        id: 5,
        path: SCIENCE,
        description: 'Наука',
    },
    {
        id: 6,
        path: CORONA,
        description: 'Коронавирус',
    },
    {
        id: 7,
        path: CARS,
        description: 'Авто',
    },
];