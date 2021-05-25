// import ArticleList from "./components/ArticleList";

import {BrowserRouter, NavLink, Route} from 'react-router-dom';
import ArticlePage from "./pages/articlePage";
import ArticleItemPage from './pages/articleItemPage';

const App =()=> {

  return (
        <BrowserRouter>
            <div>
                <div>
                    <NavLink to='/articles'>Статьи</NavLink>
                </div>
                <Route path={'/articles'} exact>
                    <ArticlePage/>
                </Route>
                <Route path={'/article/:id'} exact>
                    <ArticleItemPage/>
                </Route>
            </div>
        </BrowserRouter>
      
    // <div className="App">
    //   <Article_card onClick={()=>{console.log('click')}} variant={CardVariant.outlined} width='200px' height='200px' >
    //
    //   </Article_card>
    //     {/*<ArticleList articles={}*/}
    // </div>
  );
}

export default App;
