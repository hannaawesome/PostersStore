import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

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
import DeleteIcon from "@material-ui/icons/Delete";

import { useHistory } from "react-router-dom";
import $ from "jquery";
import Grid from "@material-ui/core/Grid";
import PosterImage from "../../components/posterImage";
import Col from "antd/es/grid/col";
import Row from "antd/es/descriptions/Row";

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

export default function PosterViewInStock({ poster, renderStock }) {
    let history = useHistory();
    const redirectPosterEdit = () => {
        history.push("poster_edit");
    };
    const handlePosterDelete = () => {
        $.ajax({
            type: "POST",
            url: "/delete_poster?id="+poster._id,
        })
            .done(function(data) {
                renderStock(poster._id);
            })
            .fail(function(jqXhr) {});
    };
    const classes = useStyles();

    function handlePosterEdit(e) {
        //var self;
        e.preventDefault();
         history.push("/poster_edit?id="+poster._id);
    }
    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{poster.name}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <PosterImage detail={poster} />
                </Col>
                <Col lg={12} xs={24}>
                    <ProductInfo
                        delete={handlePosterDelete}
                        detail={poster} />
                </Col>
            </Row>
        </div>
    );
   /* return (
        <Card className={classes.root}>
            <CardHeader
                title={poster.name}
                subheader={poster.creator}
            />

            {poster !== undefined && poster.img !== undefined && (
                <PosterImage detail={poster}/>
            )}
            <CardContent>
               {poster.price}
            </CardContent>
            <CardActions disableSpacing>
                <Grid>
                    {/* <IconButton
                    aria-label="Edit"
                    onClick={handlePosterEdit}
                >
                    <EditIcon/>
                </IconButton>}
                <IconButton
                    aria-label="Delete"
                    onClick={handlePosterDelete}
                >
                    <DeleteIcon/>
                </IconButton>
                </Grid>
            </CardActions>
        </Card>
    );*/

}
