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

export default function PosterViewInShop({ poster, renderStore }) {
    let history = useHistory();
    const [liked, setLiked] = React.useState(false);
    const handlePosterChangedSaved = () => {
        var data = {
            e_mail: sessionStorage.getItem("userEmail"),
            posterId: poster.id,
            state: !liked,
        };

        if (liked && renderStore !== undefined) {
            renderStore(poster.id);
        } else {
            setLiked(!liked);
        }

        // Submit form via jQuery/AJAX
        $.ajax({
            type: "POST",
            url: "/update_liked",
            data: data,
        })
            .done(function(data) {})
            .fail(function(jqXhr) {});

        //here we need to update  the db (send a request to the server in order to update this user's product is saved )
    };

    const classes = useStyles();


    const { addingPoster, cartItems, increase } = useContext(CartContext);

    const isInCart = (poster) => {
        return !!cartItems.find((item) => item.id === poster.id);
    };

    function ViewPosterItemHandler(e) {
        //var self;
        e.preventDefault();
         history.push("/poster/:"+poster._id);
    }
    return (
        {/*<Card className={classes.root} onClick={ViewPosterItemHandler}>
            <CardHeader
                title={poster.name}
                subheader={poster.creator}
            />

            {poster !== undefined && poster.img !== undefined && (
                <CardMedia
                    className={classes.media}
                    image={poster.img}
                    title=""
                />
            )}
            <CardContent title={poster.price}>
                if(poster.amount==0)
                    <p>out of stock</p>
            </CardContent>*/};

            <div className="row row row-cards">
                <div className="col col-sm-6 col-lg-4">
                    <div className="card p-3"><a className="mb-3"><img src="demo/photos/grant-ritchie-338179-500.jpg"
                                                                       alt="Photo by Nathan Guerrero"
                                                                       className="rounded"></a>
                        <div className="d-flex align-items-center px-2"><span className="avatar avatar-md mr-3"
                                                                              style="background-image: url(&quot;demo/faces/male/41.jpg&quot;);"></span>
                            <div>
                                <div>{poster.creator}</div>
                                <small className="d-block text-muted"> 12 days ago</small></div>
                            <div className="ml-auto text-muted"><a className="icon"><i className="fe fe-eye mr-1"></i>112</a><a
                                className="icon d-none d-md-inline-block ml-3"><i
                                className="fe fe-heart mr-1"></i>42</a></div>
                        </div>
                    </div>
                </div>
                <div className="col col-sm-6 col-lg-4">
                    <div className="card p-3"><a className="mb-3"><img src="demo/photos/ilnur-kalimullin-218996-500.jpg"
                                                                       alt="Photo by Alice Mason"
                                                                       className="rounded"></a>
                        <div className="d-flex align-items-center px-2"><span className="avatar avatar-md mr-3"
                                                                              style="background-image: url(&quot;demo/faces/female/1.jpg&quot;);"></span>
                            <div>
                                <div>Alice Mason</div>
                                <small className="d-block text-muted"> 12 days ago</small></div>
                            <div className="ml-auto text-muted"><a className="icon"><i className="fe fe-eye mr-1"></i>70</a><a
                                className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i>0</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-sm-6 col-lg-4">
                    <div className="card p-3"><a className="mb-3"><img src="demo/photos/jakob-owens-224352-500.jpg"
                                                                       alt="Photo by Rose Bradley" className="rounded"></a>
                        <div className="d-flex align-items-center px-2"><span className="avatar avatar-md mr-3"
                                                                              style="background-image: url(&quot;demo/faces/female/18.jpg&quot;);"></span>
                            <div>
                                <div>Rose Bradley</div>
                                <small className="d-block text-muted"> 4 days ago</small></div>
                            <div className="ml-auto text-muted"><a className="icon"><i className="fe fe-eye mr-1"></i>166</a><a
                                className="icon d-none d-md-inline-block ml-3"><i
                                className="fe fe-heart mr-1"></i>96</a></div>
                        </div>
                    </div>
                </div>
                <div className="col col-sm-6 col-lg-4">
                    <div className="card p-3"><a className="mb-3"><img src="demo/photos/jeremy-bishop-330225-500.jpg"
                                                                       alt="Photo by Peter Richards"
                                                                       className="rounded"></a>
                        <div className="d-flex align-items-center px-2"><span className="avatar avatar-md mr-3"
                                                                              style="background-image: url(&quot;demo/faces/male/16.jpg&quot;);"></span>
                            <div>
                                <div>Peter Richards</div>
                                <small className="d-block text-muted"> 18 days ago</small></div>
                            <div className="ml-auto text-muted"><a className="icon"><i className="fe fe-eye mr-1"></i>76</a><a
                                className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i>6</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-sm-6 col-lg-4">
                    <div className="card p-3"><a className="mb-3"><img src="demo/photos/jonatan-pie-226191-500.jpg"
                                                                       alt="Photo by Wayne Holland" className="rounded"></a>
                        <div className="d-flex align-items-center px-2"><span className="avatar avatar-md mr-3"
                                                                              style="background-image: url(&quot;demo/faces/male/26.jpg&quot;);"></span>
                            <div>
                                <div>Wayne Holland</div>
                                <small className="d-block text-muted"> 16 days ago</small></div>
                            <div className="ml-auto text-muted"><a className="icon"><i className="fe fe-eye mr-1"></i>106</a><a
                                className="icon d-none d-md-inline-block ml-3"><i
                                className="fe fe-heart mr-1"></i>36</a></div>
                        </div>
                    </div>
                </div>
                <div className="col col-sm-6 col-lg-4">
                    <div className="card p-3"><a className="mb-3"><img src="demo/photos/josh-calabrese-66153-500.jpg"
                                                                       alt="Photo by Michelle Ross" className="rounded"></a>
                        <div className="d-flex align-items-center px-2"><span className="avatar avatar-md mr-3"
                                                                              style="background-image: url(&quot;demo/faces/female/7.jpg&quot;);"></span>
                            <div>
                                <div>Michelle Ross</div>
                                <small className="d-block text-muted"> 4 days ago</small></div>
                            <div className="ml-auto text-muted"><a className="icon"><i className="fe fe-eye mr-1"></i>77</a><a
                                className="icon d-none d-md-inline-block ml-3"><i className="fe fe-heart mr-1"></i>7</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col col-sm-6 col-lg-4">
                    <div className="card p-3"><a className="mb-3"><img src="demo/photos/joshua-earle-157231-500.jpg"
                                                                       alt="Photo by Debra Beck"
                                                                       className="rounded"></a>
                        <div className="d-flex align-items-center px-2"><span className="avatar avatar-md mr-3"
                                                                              style="background-image: url(&quot;demo/faces/female/17.jpg&quot;);"></span>
                            <div>
                                <div>Debra Beck</div>
                                <small className="d-block text-muted"> 6 days ago</small></div>
                            <div className="ml-auto text-muted"><a className="icon"><i className="fe fe-eye mr-1"></i>150</a><a
                                className="icon d-none d-md-inline-block ml-3"><i
                                className="fe fe-heart mr-1"></i>80</a></div>
                        </div>
                    </div>
                </div>
                <div className="col col-sm-6 col-lg-4">
                    <div className="card p-3"><a className="mb-3"><img src="demo/photos/mahkeo-222765-500.jpg"
                                                                       alt="Photo by Phillip Peters"
                                                                       className="rounded"></a>
                        <div className="d-flex align-items-center px-2"><span className="avatar avatar-md mr-3"
                                                                              style="background-image: url(&quot;demo/faces/male/30.jpg&quot;);"></span>
                            <div>
                                <div>Phillip Peters</div>
                                <small className="d-block text-muted"> 17 days ago</small></div>
                            <div className="ml-auto text-muted"><a className="icon"><i className="fe fe-eye mr-1"></i>153</a><a
                                className="icon d-none d-md-inline-block ml-3"><i
                                className="fe fe-heart mr-1"></i>83</a></div>
                        </div>
                    </div>
                </div>
                <div className="col col-sm-6 col-lg-4">
                    <div className="card p-3"><a className="mb-3"><img src="demo/photos/matt-barrett-339981-500.jpg"
                                                                       alt="Photo by Jack Ruiz" className="rounded"></a>
                        <div className="d-flex align-items-center px-2"><span className="avatar avatar-md mr-3"
                                                                              style="background-image: url(&quot;demo/faces/male/32.jpg&quot;);"></span>
                            <div>
                                <div>Jack Ruiz</div>
                                <small className="d-block text-muted"> 15 days ago</small></div>
                            <div className="ml-auto text-muted"><a className="icon"><i className="fe fe-eye mr-1"></i>143</a><a
                                className="icon d-none d-md-inline-block ml-3"><i
                                className="fe fe-heart mr-1"></i>73</a></div>
                        </div>
                    </div>
                </div>
                <div className="col col-sm-6 col-lg-4">
                    <div className="card p-3"><a className="mb-3"><img src="demo/photos/nathan-anderson-297460-500.jpg"
                                                                       alt="Photo by Ronald Bradley"
                                                                       className="rounded"></a>
                        <div className="d-flex align-items-center px-2"><span className="avatar avatar-md mr-3"
                                                                              style="background-image: url(&quot;demo/faces/male/9.jpg&quot;);"></span>
                            <div>
                                <div>Ronald Bradley</div>
                                <small className="d-block text-muted"> 11 days ago</small></div>
                            <div className="ml-auto text-muted"><a className="icon"><i className="fe fe-eye mr-1"></i>149</a><a
                                className="icon d-none d-md-inline-block ml-3"><i
                                className="fe fe-heart mr-1"></i>79</a></div>
                        </div>
                    </div>
                </div>
                <div className="col col-sm-6 col-lg-4">
                    <div className="card p-3"><a className="mb-3"><img src="demo/photos/nathan-anderson-316188-500.jpg"
                                                                       alt="Photo by Kathleen Harper"
                                                                       className="rounded"></a>
                        <div className="d-flex align-items-center px-2"><span className="avatar avatar-md mr-3"
                                                                              style="background-image: url(&quot;demo/faces/female/8.jpg&quot;);"></span>
                            <div>
                                <div>Kathleen Harper</div>
                                <small className="d-block text-muted"> 16 days ago</small></div>
                            <div className="ml-auto text-muted"><a className="icon"><i className="fe fe-eye mr-1"></i>164</a><a
                                className="icon d-none d-md-inline-block ml-3"><i
                                className="fe fe-heart mr-1"></i>94</a></div>
                        </div>
                    </div>
                </div>
                <div className="col col-sm-6 col-lg-4">
                    <div className="card p-3"><a className="mb-3"><img src="demo/photos/nathan-dumlao-287713-500.jpg"
                                                                       alt="Photo by Bobby Knight" className="rounded"></a>
                        <div className="d-flex align-items-center px-2"><span className="avatar avatar-md mr-3"
                                                                              style="background-image: url(&quot;demo/faces/male/4.jpg&quot;);"></span>
                            <div>
                                <div>Bobby Knight</div>
                                <small className="d-block text-muted"> 6 days ago</small></div>
                            <div className="ml-auto text-muted"><a className="icon"><i className="fe fe-eye mr-1"></i>160</a><a
                                className="icon d-none d-md-inline-block ml-3"><i
                                className="fe fe-heart mr-1"></i>90</a></div>
                        </div>
                    </div>
                </div>
            </div>;
            <CardActions disableSpacing>
                <IconButton
                    aria-label="add to favorites"
                    onClick={handlePosterChangedSaved}
                >
                    {!liked && <FavoriteBorderIcon />}
                    {liked && <FavoriteIcon />}
                </IconButton>

            </CardActions>;
        </Card>
    );
}
