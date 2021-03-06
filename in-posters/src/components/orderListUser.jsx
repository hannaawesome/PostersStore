import React, { useContext } from "react";
import OrderListItem from "./orderListItem";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


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

const OrderListUser = () => {
    const classes = useStyles();

    const [orders, ordersSet] = React.useState([]);

    React.useEffect(() => {
        async function fetchOrders() {
            const fullResponse = await fetch(
                "/get_user_orders?email="+sessionStorage.getItem("userEmail")
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

export default OrderListUser;
