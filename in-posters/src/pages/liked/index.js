import React, { useContext } from "react";
import PosterViewInShop from "./../Store/posterViewInShop";
//import { ProductsContext } from "../../contexts/ProductsContext";
//import styles from './ProductsGrid.module.scss';

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },

}));

const Liked = () => {
    const classes = useStyles();

    const [posters, setPosters] = React.useState([]);

    React.useEffect(() => {
        async function fetchPosters() {
            const fullResponse = await fetch(
                "/get_liked_items?email=" + sessionStorage.getItem("userEmail")
            );
            const responseJson = await fullResponse.json();
            setPosters(responseJson);
        }

        fetchPosters();
    }, []);
    return (
        <React.Fragment>
            <CssBaseline />
            <br />
            <br />
            <br />
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                        >
                            Liked Posters
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">

                    <Grid container spacing={4}>
                        {posters!==undefined&&posters.length>0?(posters.map((poster, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <PosterViewInShop key={index} poster={poster} />
                            </Grid>
                        ))):null}
                    </Grid>
                </Container>
            </main>
            <br />
            <br />
            <br />
        </React.Fragment>
    );
};

export default Liked;
