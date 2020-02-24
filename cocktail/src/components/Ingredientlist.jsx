import React from 'react'
import Ingred from "./Ingredients"

export default function Ingredientlist(props) {
    return (
        <div>
            {props.ingredients.map(ingredient =>{
                return(
                    <Ingred deleteIngredient = {props.deleteIngredients} ingredient={ingredient}/>
                )
            })}
        </div>
    )
}