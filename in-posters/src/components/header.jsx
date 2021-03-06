import React from "react";
import logo from "./components_images/Wolf.svg";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Navbar from "react-bootstrap/Navbar";
import {useHistory} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    logoImg:{
    width:45,
    height:45,
    border_radius: 1
}
}));

export default function Header() {
    const styles=useStyles();
    let history = useHistory();
    function redirectHome(e) {
        history.push("/");
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand onClick={redirectHome}>
                    <img
                        alt=""
                        src={logo}
                        className={styles.logoImg}
                    />{' '}
                    inPosters
                </Navbar.Brand>

            </Navbar>
        </div>
    );
}
