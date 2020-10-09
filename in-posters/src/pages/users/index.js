import React from "react";
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
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import AccountDetails from "../../components/accountDetails";

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

const UserData = () => {
    const classes = useStyles();

    const [users, usersSet] = React.useState([]);
    const [usersToShow, usersToShowSet] = React.useState([]);
    const [role, setRole] = React.useState("All");
    const [searchValue, setSearchValue] = React.useState("");

    const handleChangeRole = (event) => {
        setRole(event.target.value);
        console.log(event.target.value);
        switch (event.target.value) {
            case "All":
                break;
            case "Admin":
                usersToShow.filter(function(a) {
                    return a.category!==""&&a.category === "Admin" });
                break;
            case "Customer":
                usersToShow.filter(function(a) {
                    return a.category!==""&&a.category === "Customer" });
                break;
            case "Employee":
                usersToShow.filter(function(a) {
                    return a.category!==""&&a.category === "Employee" });
                break;
            default:
                break;
        }
    };

    const handleSearchChange = (event, newInputValue) => {
        setSearchValue(newInputValue);
        console.log(newInputValue);
        if (newInputValue !== "" && newInputValue !== null) {
            let index = users.findIndex((item) => {
                return item.name === newInputValue;
            });
            console.log(index);
            if (index !== -1) {
                usersToShowSet([users[index]]);
                console.log("change", users);
            }
        } else {
            usersToShowSet(users);
        }
    };
    const handleAddUser = (event) => {
        event.preventDefault();
       // history.push("/");
    };
    React.useEffect(() => {
        async function fetchUsers() {
            const fullResponse = await fetch(
                "/get_users"
            );
            const responseJson = await fullResponse.json();
            usersSet(responseJson);
            usersToShowSet(responseJson);
        }

        fetchUsers();
    }, []);
    return (
        <React.Fragment>
            <CssBaseline />
            <br />
            <br />
            <br />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <div style={{ width: 300 }}>
                                        <IconButton
                                            onClick={handleAddUser}
                                            style={{maxWidth: "130px", maxHeight: "30px"}}
                                        >
                                            <AddIcon/>
                                        </IconButton>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <div style={{ width: 300 }}>
                                        <Autocomplete
                                            value={searchValue}
                                            onChange={handleSearchChange}
                                            options={users.map((option) => option.name)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Search"
                                                    variant="outlined"
                                                />
                                            )}
                                        />
                                    </div>
                                </Grid>
                                <Grid item>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-autowidth-label">
                                            Role
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            defaultValue={0}
                                            value={role}
                                            onChange={handleChangeRole}
                                            autoWidth
                                        >
                                            <MenuItem value={"All"}>All</MenuItem>
                                            <MenuItem value={"Admin"}>Cars</MenuItem>
                                            <MenuItem value={"Customer"}>People</MenuItem>
                                            <MenuItem value={"Employee"}>View</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}

                    <Grid container spacing={4}>
                        {usersToShow !== undefined &&
                        usersToShow.map((user, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <AccountDetails key={index} user={user} />
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

export default UserData;
