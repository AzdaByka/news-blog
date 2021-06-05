import { StoreStructure } from '../../types/StoreStructure';
import { Reducer } from 'redux';
import {ArticleActionType, NewsActionType} from '../../actions/actionTypes';
import { LOAD_NEWS, ADD_NEWS } from '../../actions/newsActions';
import {strict} from "assert";



const initialState: StoreStructure = {
    articles: [],
    rubrics:'',
}

export const articleReducer = (state= initialState, action: NewsActionType):StoreStructure => {
    switch(action.type){
        case LOAD_NEWS:
            console.log('LOAD news (action in reducer');
            return {rubrics: action.rubrics, articles: action.articles}
        case ADD_NEWS:
            console.log('ADD news (action in reducer');
            return {rubrics: action.rubrics, articles: action.articles}
        default:
            return state;
    }
}
