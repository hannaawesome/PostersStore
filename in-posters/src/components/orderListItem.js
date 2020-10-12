import {useHistory} from "react-router-dom";
import $ from "jquery";
import {useContext} from "react";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {CardDescription} from "semantic-ui-react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PhoneIcon from "@material-ui/icons/Phone";
import Typography from "@material-ui/core/Typography";
import PublicIcon from "@material-ui/icons/Public";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
var React = require('react');
const useStyles = makeStyles((theme) => ({
    cardStl : {
        backgroundColor: '#fafafa',
        width: '30%',
        height: '20%',
        overflow: 'hidden',
        boxShadow: '.25px .25px 5px .25px',
        borderRadius: '2px 2px 2px 2px',
        zIndex: 5
    },

    headerStl : {
        backgroundColor: '#901111', // red
        padding: '1%',
        color: '#eceff1',
        position: 'relative'
    },

    contentStl :{
        color: 'rgb(0, 0, 0, 0.54)',
        padding: '2%'
    }
}));

export default function OrderListItem({ order }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return (
        <Card className={classes.cardStl}>
            <CardHeader className={classes.headerStl}
                        title={order._id}
            />
            <CardContent>
                <List className={classes.root}>
                    <ListItem>
                        <Typography>Total Price: {order.totalPrice}</Typography> />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PublicIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <Typography>Address: {order.shipmentAddress}</Typography>
                    </ListItem>
                <ListItem style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Products
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Size</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order.itemsInOrder.map((poster, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{poster.name}</TableCell>
                                                <TableCell>{poster.amountChosen}</TableCell>
                                                <TableCell>
                                                    {poster.price}$
                                                </TableCell>
                                                <TableCell>
                                                    {poster.measurementChosen}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                </ListItem>
                </List>}
            </CardContent>
            <CardActions>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </CardActions>
        </Card>
    );
}