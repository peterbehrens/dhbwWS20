import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Zutatenliste from "./Zutatenliste"
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Ingredientlist from './Ingredients';




export default function allIngredients(props) {

    const [values, setValues] = useState({
        ingredients : ""
    })

    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value})
      };

    function handleAddElement(){
        if (values.ingredients === "") return
        props.updateIngredients(values.ingredients)
        setValues({
            ingredients : ""
        })
    }

    return (
    <React.Fragment>
        
        <Grid container
        direction="column"
        justify="center"
        alignItems="center">
            <Grid >
                <TextField value={values.ingredients} onChange={handleChange("ingredients")} label="Zutat" variant="outlined" />
            </Grid>
            <Grid >
                <Button onClick={handleAddElement} variant="contained">Add</Button>
            </Grid>
            <Grid >
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={props.shopping} onChange={props.handleChangeShopping}/>}
                        label="Do you want to go shopping?"
                        labelPlacement="Let's go!"
                    />
            </FormGroup>
            </Grid>
            
        </Grid>
        <Ingredientlist ingredients={props.ingredients} deleteIngredients = {props.deleteIngredients}/>
    </React.Fragment>
    )
}
