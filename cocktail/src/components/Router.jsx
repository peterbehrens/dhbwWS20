import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import allIngredients from './Home';
import recipes from './Recipe';
import prepare from './Preparation';
import navigation from "./Navigation"



export default function Router() {
    return (
        <BrowserRouter >
            <navigation/>
            <Switch>
                <Route path="/Recipe" component={recipes}/>
                <Route path="/Preparation/:id" component={prepare}/>
                <Route path="/Home" component={allIngredients}/>
            </Switch>
        </BrowserRouter>
    )
}