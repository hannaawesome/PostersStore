import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ImageUploader from 'react-images-upload';
import { Multiselect } from 'multiselect-react-dropdown';

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import $ from "jquery";
import { useHistory } from "react-router-dom";
import makeToast from "../../Toaster";
import withRouter from "react-router-dom/es/withRouter";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        height: "100vh",
    },
    image: {
        backgroundImage: "url(https://source.unsplash.com/random/?phone)",
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const AddPoster= () => {
    const [pName,setPName]=React.useState("");
    const [creator,setCreator]=React.useState("");
    const [img,setImg]=React.useState("");
    const [price,setPrice]=React.useState(0);
    const [sizeList,setSizeList]=React.useState([]);
    const [tagList,setTagList]=React.useState([]);
    const [amount,setAmount]=React.useState(1);
    const constSizeList = ["50X70","160X180","100X120"];
    const constTagList = ["cars","people","music","view"];
    let history = useHistory();
    const classes = useStyles();

const onDrop=(picture)=> {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
};

    const onSuccess = () => {
        console.log("added poster");
        history.push('/stock')
    };
    const onFailure = error => {
        makeToast("error", error.response.data.message);
    };
    const onSubmitAddedHandler= (e) => {
        e.preventDefault();
        var data = {
            name: pName,
            creator: creator,
            img: img,
            price: price,
            sizeList: sizeList,
            tagList: tagList,
            amount: amount
        };
        // Submit form via jQuery/AJAX
        $.ajax({
            type: "POST",
            url: "/add_poster",
            data: data,
        }).then(onSuccess)
            .catch(onFailure);
    };

    return (
        <div className={classes.paper}>
            <br/>
            <br/>
            <Typography component="h1" variant="h5">
                Add Poster
            </Typography>

            <form
                className={classes.form}
                onSubmit={onSubmitAddedHandler}
                noValidate
            >
                <Grid container spacing={3}>

                    <Grid item xs={12} sm={12}>

                        <TextField
                            autoComplete="name"
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                            onChange={(e) => setPName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="creator"
                            label="Creator"
                            name="creator"
                            autoComplete="creator"
                            onChange={e => {setCreator(e.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="price"
                            label="Price"
                            name="price"
                            autoComplete="price"
                            onChange={e => {setPrice(e.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="amount"
                            label="amount"
                            id="amount"
                            autoComplete="amount"
                            onChange={e => {setAmount(e.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />
                    </Grid>
                    <Grid item xs={5}>
                        <Multiselect
                            options={constSizeList}
                            selectedValues={sizeList} // Preselected value to persist in dropdown
                            onSelect={e => {setSizeList(e.target.value)}} // Function will trigger on select event
                            displayValue="Select Tags" // Property name to display in the dropdown options
                            maxWidth="xs"
                        />
                        )}
                    </Grid>
                    <Grid item xs={5} sm={6}>
                        <Multiselect
                            options={constTagList}
                            selectedValues={tagList} // Preselected value to persist in dropdown
                            onSelect={e => {setTagList(e.target.value)}} // Function will trigger on select event
                            displayValue="Select Tags" // Property name to display in the dropdown options
                            maxWidth="xs"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}>
                    Add
                </Button>
            </form>
        </div>
    )
};
export default withRouter(AddPoster);
