import React, { useContext } from "react";
import PosterViewInStock from "./posterViewInStock";
//import { ProductsContext } from "../../contexts/ProductsContext";
//import styles from './ProductsGrid.module.scss';

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddIcon from '@material-ui/icons/Add';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import FullHeartIcon from "@material-ui/icons/Favorite";
import BorderHeartIcon from "@material-ui/icons/FavoriteBorder";
import {useHistory} from "react-router-dom";

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
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const Stock = () => {
    const classes = useStyles();
    let history = useHistory();

    const [posters, postersSet] = React.useState([]);
    const [postersToShow, postersToShowSet] = React.useState([]);
    const [genre, setGenre] = React.useState("all");
    const [searchValue, setSearchValue] = React.useState("");

    const handleChangeGenre = (event) => {
        setGenre(event.target.value);
        console.log(event.target.value);
        switch (event.target.value) {
            case "all": //high to low
                break;
            case "vehicle": //low to high
                postersToShow.filter(function(a) {
                    return a.tags!==[]&&a.tags.findIndex((item) => item.tag === "vehicle") === -1;});
                break;
            case "view": //low to high
                postersToShow.filter(function(a) {
                    return a.tags!==[]&&a.tags.findIndex((item) => item.tag === "view") === -1;});
                break;
            case "people": //low to high
                postersToShow.filter(function(a) {
                    return a.tags!==[]&&a.tags.findIndex((item) => item.tag === "people") === -1;});
                break;
            case "music": //low to high
                postersToShow.filter(function(a) {
                    return a.tags!==[]&&a.tags.findIndex((item) => item.tag === "music") === -1;});
                break;
            default:
                break;
        }
    };

    const handleSearchChange = (event, newInputValue) => {
        setSearchValue(newInputValue);
        console.log(newInputValue);
        if (newInputValue !== "" && newInputValue !== null) {
            let index = posters.findIndex((item) => {
                return item.name === newInputValue;
            });
            console.log(index);
            if (index !== -1) {
                postersToShowSet([posters[index]]);
                console.log("change", posters);
            }
        } else {
            postersToShowSet(posters);
        }
    };
    const handleAddPoster = (event) => {
        event.preventDefault();
        history.push("/add_poster");
    };
    React.useEffect(() => {
        async function fetchPosters() {
            const fullResponse = await fetch(
                "/get_posters");
            const responseJson = await fullResponse.json();
            postersSet(responseJson);
            postersToShowSet(responseJson);
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
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <div style={{ width: 300 }}>
                                        <IconButton
                                            onClick={handleAddPoster}
                                            style={{maxWidth: "130px", maxHeight: "30px"}}
                                        >
                                            <AddIcon/>
                                        </IconButton>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <div style={{ width: 300 }}>
                                        <Autocomplete
                                            value={searchValue}
                                            onChange={handleSearchChange}
                                            options={posters.map((option) => option.name)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Search"
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                    </div>
                                </Grid>
                                <Grid item>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-autowidth-label">
                                            Genre
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            defaultValue={0}
                                            value={genre}
                                            onChange={handleChangeGenre}
                                            autoWidth
                                        >
                                            <MenuItem value={"all"}>All</MenuItem>
                                            <MenuItem value={"vehicle"}>Vehicle</MenuItem>
                                            <MenuItem value={"people"}>People</MenuItem>
                                            <MenuItem value={"view"}>View</MenuItem>
                                            <MenuItem value={"music"}>Music</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {postersToShow !== undefined &&
                        postersToShow.map((poster, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <PosterViewInStock key={index} poster={poster} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            <br />
            <br />
            <br />
        </React.Fragment>
    );
};

export default Stock;
