import React from "react";

import { Card, Feed } from 'semantic-ui-react'
import { makeStyles } from "@material-ui/core/styles";

import {useHistory} from "react-router-dom";
import AccountDetailsAdmin from "./accountDetailsAdmin";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    icon: {
        marginRight: theme.spacing(2),
    },

    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },

}));

const UserData = () => {
    const classes = useStyles();
    let history = useHistory();
    const [users, usersSet] = React.useState([]);
    const [usersToShow, usersToShowSet] = React.useState([]);
    const [role, setRole] = React.useState("All");
    const [searchValue, setSearchValue] = React.useState("");

    const handleChangeRole = (event) => {
        setRole(event.target.value);
        if(role!=="All")
                usersToShowSet(users.filter(function(a) {
                    return a.category!==""&&a.category === role;}));
        else
            usersToShowSet(users);

    };

    const handleSearchChange = (event, newInputValue) => {
        setSearchValue(newInputValue);
        if (newInputValue !== "" && newInputValue !== null) {
            let index = users.findIndex((item) => {
                return item.fullName === newInputValue;
            });
            if (index !== -1) {
                usersToShowSet([users[index]]);
            }
        } else {
            usersToShowSet(users);
        }
    };
    const handleAddUser = (event) => {
        event.preventDefault();
        history.push("/add_user");
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
                <h1>Cart</h1>
            <CssBaseline />
            <br />
            <br />
            <br />
            <main>
                <div className={classes.heroContent}>
                    <Card.Group maxWidth="sm">
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
                                            options={users.map((option) => option.fullName)}
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
                                            <MenuItem value={"Employee"}>Employee</MenuItem>
                                            <MenuItem value={"Customer"}>Customer</MenuItem>
                                            <MenuItem value={"Admin"}>Admin</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
                    </Card.Group>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">

                    <Grid container spacing={4}>
                        {usersToShow !== undefined &&
                        usersToShow.map((user, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <AccountDetailsAdmin key={index} user={user} />
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
