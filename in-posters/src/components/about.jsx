import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import "./css/styles.css"
import {makeStyles} from "@material-ui/core/styles";
import colors from "@material-ui/core/colors/common";
const useStyles = makeStyles((theme) => ({
    label_data: {
        color:colors.white
    }
}));
export default function About() {
    const classes=useStyles();
    return (
        <div>

            <Box
                display="flex"
                bgcolor="black"
                alignItems="center"
                justifyContent="center"
            >
                <img src="./images/hiclipart.com (1).png" roundedCircle width={50} height={50} alt=""/>

                <span className={classes.label_data}>
                    With the growth in Internet usage, posters delivery in Israel has taken on a new dimension.
                    Online delivery seems to be the latest means through which people order and receive their posters.
                    Whether you want your posters delivered at home or to the office, the flexibility that comes with online delivery can meet such requirements extremely well.
                    The reason that many poster shoppers in Israel prefer online delivery is because of its convenience.
                    With the busy work lives that many people have nowadays, it becomes almost impossible to order and queue for deliveries.
                    At the click of a button, the same can be executed online without any inconveniences.
                    The speed of delivery is also commendable. Whether local or overseas, posters delivery to Israel makes use of some of the best delivery services.
                    This makes online delivery dependable and reliable both to the sender and the recipient.
            </span>
                </Box>




        </div>
    );
}
