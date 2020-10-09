import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { CartContext } from "../../contexts/CartContext";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ImageUploader from 'react-images-upload';


import ButtonUp from "@material-ui/core/Button";
import FullHeartIcon from "@material-ui/icons/Favorite";
import BorderHeartIcon from "@material-ui/icons/FavoriteBorder";

import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import { makeStyles } from "@material-ui/core/styles";
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


function fileOrLink(element, listItem) {
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

class AddPoster extends React.Component {

      static contextType = CartContext;

    constructor({match}) {
        super();
        this.params = match.params;

        this.state = {
            full: 0,
          image:"",
            poster: {},

        };
    this.onDrop = this.onDrop.bind(this);
    this.handleClick = this.handleHeartClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        try {
            const resp = await fetch("/getPoster?id=" + this.params.posterId);
            if (!resp.ok) {
                throw Error(resp.statusText);
            }
            const poster = await resp.json();
            this.setState({poster: poster});

        } catch (err) {
            console.log(err);
        }
    }
onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
}

   /* handleHeartClick() {
        const {full, isVisible, product} = this.state;
        if (full) this.setState({full: 0});
        else this.setState({full: 1});
    }*/

    render() {
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
                        <Grid>
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                        />
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
export default withStyles(styles, { withTheme: true })(AddPoster);
