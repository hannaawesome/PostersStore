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

const sizeList = [
    { width:160,
        length:180},
    { width:100,
        length:120},
    { width:50,
        length:70}
];

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

class ComplexGrid extends React.Component {
    static contextType = CartContext;

    constructor({match}) {
        super();
        this.params = match.params;

        this.state = {
            full: 0,
            isVisible: 0,
            product: {},
            rating: 0,
            commentText: "",
            commentsList: [],
        };
        this.handleClick = this.handleHeartClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        try {
            const resp = await fetch("/GetPosterItem?Id=" + this.params.posterId);
            if (!resp.ok) {
                throw Error(resp.statusText);
            }
            const poster = await resp.json();
            this.setState({poster: poster});

        } catch (err) {
            console.log(err);
        }
    }

    handleChange(e, {name, value}) {
        this.setState({commentText: value});
    }

    handleChangeRating(e, value) {
        this.setState({rating: value});
    }


    handleHeartClick() {
        const {full, isVisible, product} = this.state;
        if (full) this.setState({full: 0});
        else this.setState({full: 1});
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

                        <Grid item xs={1}></Grid>
                        <Grid item xs={5}>

                            <Dropdown
                                items={sizeList}
                                maxWidth="xs"
                            />
                            )}
                        </Grid>

                        <Grid item xs={3} className="text-left ml-5">
                            <Grid container direction="column">
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Typography gutterBottom variant="h3">
                                            {poster.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} className="mt-3">
                                        <Chip
                                            variant="outlined"
                                            size="madium"
                                            label={poster.creator}
                                        />
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid item xs>
                                    <Typography
                                        variant="h5"
                                        gutterBottom
                                        className={classes.price}
                                    >
                                        {poster.price}
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
                                        onClick={() => cartContext.addPoster(poster)}
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
                                {poster.tags !== undefined &&
                                poster.tags.map((item, index) => {
                                    return (
                                        <ListItemText
                                            tag={item}
                                        />
                                    );
                                })};
                            </List>
                        </Grid>
                    </Grid>
                </div>
            </div>

        );
    }
}
export default withStyles(styles, { withTheme: true })(ComplexGrid);
