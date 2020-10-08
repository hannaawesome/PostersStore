import React, { useContext } from "react";
import OrderListItem from "../../components/orderListItem";
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

const OrderList = () => {
    const classes = useStyles();

    const [orders, ordersSet] = React.useState([]);

    React.useEffect(() => {
        async function fetchOrders() {
            const fullResponse = await fetch(
                "/get_orders"
            );
            const responseJson = await fullResponse.json();
            ordersSet(responseJson);
        }

        fetchOrders().then(r => console.log("got"));
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <br />
            <br />
            <br />
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}

                    <Grid container spacing={4}>
                        {orders !== undefined &&
                        orders.map((order, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <OrderListItem key={index} order={order} />
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

export default OrderList;
