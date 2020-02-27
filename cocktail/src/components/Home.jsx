import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Ingredientlist from "./Ingredientlist";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import ".././style.css";




export default function AllIngredients(props) {

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
    <div id="wrapper">
        <table>
        <Grid container
        direction="column"
        justify="center"
        alignItems="center">
            <tr>
            <Grid >
                <td><TextField value={values.ingredients} onChange={handleChange("ingredients")} label="Zutat" variant="outlined" /></td>
            </Grid>
            </tr>
            <tr>
            <Grid >
                <td><Button onClick={handleAddElement} variant="contained">Add</Button></td>
            </Grid>
            </tr>
            <tr>
            <Grid >
                <td><FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={props.shopping} onChange={props.handleChangeShopping}/>}
                        label="Do you want to go shopping?"
                        labelPlacement="Let's go!"
                    />
                </FormGroup></td>
            </Grid>
            </tr>
            
        </Grid>
        <tr>
        <td><Ingredientlist ingredients={props.ingredients} deleteIngredients = {props.deleteIngredients}/></td>
        </tr>
        </table>
    </div>
    </React.Fragment>
    )
}
