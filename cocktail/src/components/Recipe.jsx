import React, { Component } from 'react';
import axios from "axios";
import Prepare from "./Preparation";
import Grid from '@material-ui/core/Grid';

export default class All_recipes extends Component {

    constructor(props){
        super(props);
        this.state ={
            download : [],
            recipes : [],
            shopping : true
        }
    }
    //Including Firebase Realtime Database where different recipes are stored

    componentDidMount(){
        this.getDatabaseUpdate()
        this.state.shopping = this.props.shopping
        console.log("Domponent did mount")
    }

    getDatabaseUpdate(){
        axios.get("https://cocktail-app-f8080.firebaseio.com/recipes.json").then(
        response =>   {
            const fetchedOrders = [];
            for (let key in response.data){
                fetchedOrders.push({
                    ...response.data[key], 
                    id : key
                })
            this.state.download = fetchedOrders
            }
            this.setRecipes()
    })}

    setRecipes(){
        this.state.download.map(recipe => {
            const ingredients = recipe.ingredients.split(",")
            const recipename = recipe.name
            var newelement = {}
            newelement["ingredients"] = ingredients
            newelement["name"] = recipename
            this.state.recipes.push(newelement)
        })
        this.checkMatchingRateIngRec()
    }

    checkMatchingRateIngRec(){
        this.state.recipes.forEach( recipe => {
            var ret = []
            var matchingRate = 0
            for(var i in recipe) {
                for(var ingredients in recipe[i]){
                    if(this.props.ingredients.indexOf(recipe[i][ingredients]) > -1){
                        ret.push(recipe[i][ingredients]);
                    }
                }
            if (i === "ingredients"){
            matchingRate = ret.length / recipe[i].length
            recipe.matchingRate = matchingRate
            }
            }
        })
        this.forceUpdate()
        this.state.recipes.sort(this.compareValues("matchingRate"))
        this.forceUpdate()
    }

    compareValues(key, order = 'desc') {
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
            }
        
            const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];
        
            let comparison = 0;
            if (varA > varB) {
            comparison = 1;
            } else if (varA < varB) {
            comparison = -1;
            }
            return (
            (order === 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    render() {
        return(
        this.state.recipes.map(item => {
            return (
                <Grid container
                direction="column"
                justify="center"
                alignItems="center"
                >
                    <Grid>
                        <Prepare key={item.name} shopping={this.state.shopping} recipe = {item}/>
                    </Grid>
                </Grid>
            )   
        })
        )
    }
}