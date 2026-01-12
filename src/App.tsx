import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RecipeList } from './features/RecipeList';
import { RecipeDetail } from './features/RecipeDetail/RecipeDetail';
import { RecipeForm } from './features/RecipeForm/RecipeForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={RecipeList} />
        <Route exact path="/recipes/new" component={RecipeForm} />
        <Route exact path="/recipes/:id" component={RecipeDetail} />
        <Route exact path="/recipes/:id/edit" component={RecipeForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
