import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CartContext } from "../../contexts/CartContext";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";


import ButtonUp from "@material-ui/core/Button";
import FullHeartIcon from "@material-ui/icons/Favorite";
import BorderHeartIcon from "@material-ui/icons/FavoriteBorder";
//import { SketchPicker } from "react-color";

import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import { makeStyles } from "@material-ui/core/styles";
//import Avatar from "@material-ui/core/Avatar";
import $ from "jquery";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
//import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import { Divider } from "@material-ui/core";
import {Dropdown} from "react-bootstrap";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import makeToast from "../../Toaster";
import PosterImage from "../../components/posterImage";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        "& > * + *": {
            marginTop: theme.spacing(1),
        },
    },
}));

function generate(element, listItem) {
    return listItem.map((value) =>
        React.cloneElement(element, {
            key: value,
        })
    );
}

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(5),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },

    price: {
        color: theme.palette.error.main,
    },
});
class PosterData extends React.Component {
    static contextType = CartContext;

    constructor({match}) {
        super();
        this.params = match.params;

        this.state = {
            full: 0,
            poster: {},
            measurement:""
        };
        this.handleHeartClick = this.handleHeartClick.bind(this);
        this.handleMeasurement=this.handleMeasurement.bind(this);
    }

    async componentDidMount() {
        try {
            const resp = await fetch("/get_poster?id=" + this.params.posterId);
            if (!resp.ok) {
                throw Error(resp.statusText);
            }
            const poster = await resp.json();
            this.setState({poster: poster});

        } catch (err) {
            console.log(err);
        }
    }

   handleHeartClick() {
        const {full} = this.state;
        if (full) this.setState({full: 0});
        else this.setState({full: 1});
    }
    handleMeasurement(e) {
        this.setState({measurement:e.target.value})
    }

    render() {
        const cartContext = this.context;
        const {classes} = this.props;
        const {
            full,
            poster,
        } = this.state;
        return (
            <div>
                <div className="text-center mt-5">
                    <Grid container spacing={3}>
                        <Grid item xs={12}/>
                        <Grid item xs={12}></Grid>
                        <img src={'../'+poster.img}/>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">Size</InputLabel>
                        <Select
                            native
                            value={this.state.measurement}
                            onChange={this.state.handleMeasurement}
                            inputProps={{
                                name: 'size',
                                id: 'age-native-simple',
                            }}>
                            { poster.sizeList?poster.sizeList.map(s=><option value={s}>{s}</option>):null}
                        </Select>
                        </FormControl>
                        <Grid item xs={3} className="text-left ml-5">
                            <Grid container direction="column">
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Typography gutterBottom variant="h3">
                                            {poster.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} className="mt-3">
                                        <Typography gutterBottom variant="h5">
                                            {poster.creator}
                                        </Typography>

                                    </Grid>
                                </Grid>
                                <Grid item xs>
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        className={classes.price}
                                    >
                                        {poster.price}$
                                    </Typography>
                                    <br/>
                                    <br/>
                                    <br/>
                                </Grid>

                                <Grid item xs container>
                                    <ButtonUp
                                        variant="contained"
                                        color="secondary"
                                        style={{maxWidth: "160px", maxHeight: "30px"}}
                                        onClick={() => {cartContext.addingPoster(poster,this.state.measurement)}}
                                    >
                                        Add to cart
                                    </ButtonUp>
                                     <IconButton
                                        onClick={this.handleClick}
                                        style={{maxWidth: "130px", maxHeight: "30px"}}
                                    >
                                        {full ? <FullHeartIcon/> : <BorderHeartIcon/>}
                                    </IconButton>
                                </Grid>
                                <br/>
                                <br/>
                            </Grid>

                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={12}>
                            <div>
                                <Typography className={classes.heading}>
                                    Tags
                                </Typography>
                            </div>
                            <List>
                                {poster.tagList !== undefined &&
                                poster.tagList.map((item, index) => {
                                    return (
                                        <ListItemText
                                            tag={item}
                                        />
                                    );
                                })}
                            </List>
                        </Grid>
                         <Grid item xs={12} sm={6} >

                        </Grid>
                    </Grid>
                </div>
            </div>

        );
    }
}
export default withStyles(styles, { withTheme: true })(PosterData);
