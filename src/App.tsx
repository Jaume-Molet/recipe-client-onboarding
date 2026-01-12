import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RecipeList } from './features/RecipeList';
import { RecipeDetail } from './features/RecipeDetail/RecipeDetail';
import { RecipeForm } from './features/RecipeForm/RecipeForm';
import './App.css';

function App() {
  console.log('App component rendering, current path:', window.location.pathname);
  
  try {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={RecipeList} />
          <Route exact path="/recipes/new" component={RecipeForm} />
          <Route exact path="/recipes/:id" component={RecipeDetail} />
          <Route exact path="/recipes/:id/edit" component={RecipeForm} />
          {/* Fallback route for debugging */}
          <Route path="*">
            <div style={{ padding: '20px', color: 'orange' }}>
              <h1>Route Not Found</h1>
              <p>Current path: {window.location.pathname}</p>
              <p>Available routes:</p>
              <ul>
                <li>/ (RecipeList)</li>
                <li>/recipes/new (RecipeForm)</li>
                <li>/recipes/:id (RecipeDetail)</li>
                <li>/recipes/:id/edit (RecipeForm)</li>
              </ul>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  } catch (error) {
    console.error('App render error:', error);
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>Error</h1>
        <p>{error instanceof Error ? error.message : String(error)}</p>
      </div>
    );
  }
}

export default App;
