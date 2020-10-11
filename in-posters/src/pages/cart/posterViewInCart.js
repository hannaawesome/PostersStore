import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
//import { formatNumber } from "../../helpers/utils";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Rating from "@material-ui/lab/Rating";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import useTheme from "@material-ui/core/styles/useTheme";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: "80.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const PosterViewInCart=({ poster }) => {
    const { increase, decrease, removePoster } = useContext(CartContext);
    const theme = useTheme();
    return (
        <div className="row no-gutters py-2 ">
            <div className="col-sm-2 p-2">
                {poster !== undefined && poster.img !== undefined && (
                    <img
                        style={{ margin: "0 auto", maxHeight: "50px" }}
                        src={poster.img}
                        className="img-fluid d-block"
                    />
                )}
            </div>
            <div className="col-sm-4 p-2">
                <h5 className="mb-1">{poster.name}</h5>
                <p className="mb-1">Price: {poster.price} </p>
            </div>
            <div className="col-sm-2 p-2 text-center ">
                <p className="mb-0">Quantity: {poster.amountChosen}</p>
            </div>
            <div className="col-sm-4 p-2 text-right">
                <IconButton aria-label="add" onClick={() => increase(poster)}>
                    <AddCircleOutlinedIcon />
                </IconButton>

                {poster.amountChosen > 1 && (
                    <IconButton aria-label="delete" onClick={() => decrease(poster)}>
                        <RemoveCircleIcon />
                    </IconButton>
                )}

                {poster.amountChosen === 1 && (
                    <IconButton
                        aria-label="delete"
                        onClick={() => removePoster(poster)}
                    >
                        <DeleteIcon />
                    </IconButton>
                )}
            </div>
        </div>
    );
};
export default PosterViewInCart;