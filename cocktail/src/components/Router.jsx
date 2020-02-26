import React, { Component } from 'react'
import { BrowserRouter,
    Switch,
    Route  } from "react-router-dom";
import allIngredients from './Home';
import all_recipes from './Recipe';
import prepare from './Preparation';
import menu_navigation from "./Navigation"


const LOCAL_STORAGE_KEY ="cocktailapp.ingredients"
const LOCAL_STORAGE_SHOPPING = "cocktailapp.shopping"

export default class Router extends Component {

    constructor (props){
        super(props);
        this.state = {
            ingredients : [],
            shopping: false
        }
    } 

    componentDidMount(){
        const storedIngredients = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        const storedShopping = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SHOPPING))
        if (storedIngredients) this.state.ingredients = storedIngredients
        if (storedShopping) this.state.shopping = storedShopping
        this.forceUpdate()
    }

    updateIngredients (input){
        this.state.ingredients.push(input)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state.ingredients))
        this.forceUpdate()
    }

    deleteIngredients (input){
        this.state.ingredients.splice( this.state.ingredients.indexOf(input), 1 )
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state.ingredients))
        this.forceUpdate()
    }

    handleChangeShopping(){
        this.state.shopping = !this.state.shopping
        localStorage.setItem(LOCAL_STORAGE_SHOPPING, JSON.stringify(this.state.shopping))
        this.forceUpdate()
    }


    render() {
        return (
            <div>
            <BrowserRouter >
                <menu_navigation/>
                    <Switch>
                        <Route path="./Recipe" render={(props) => <all_recipes {...props}  shopping={this.state.shopping} ingredients={this.state.ingredients} />}/>
                        <Route path="/Preparation/:id" component={prepare}/>
                        <Route path="./Home" render={(props) => <allIngredients {...props} shopping={this.state.shopping} deleteIngredients={this.deleteIngredients.bind(this)} 
                            ingredients={this.state.ingredients} updateIngredients={this.updateIngredients.bind(this)} handleChangeShopping={this.handleChangeShopping.bind(this)}/>}/>
                    </Switch>
            </BrowserRouter>
            </div>
        )
    }
}