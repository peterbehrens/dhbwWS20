import React from 'react';
import { Link } from 'react-router-dom';
import ListIcon from '@material-ui/icons/List';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Grid from '@material-ui/core/Grid';
import ".././style.css"




export default function Menu_navigation({props}) {

    return (
        <div>
            <Grid container
                direction="row"
                justify="center"
                alignItems="center">
                <Grid>
                    <IconButton color='inherit' aria-label="delete" component={Link} to={'/'}>
                        <PlaylistAddIcon />
                    </IconButton>
                </Grid>
                <Grid>
                    <IconButton color='inherit' aria-label="delete" component={Link} to={'/Recipe'}>
                        <ListIcon />
                    </IconButton>
                </Grid>
            </Grid>            
        </div>
    )
}