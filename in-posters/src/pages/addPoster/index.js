import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
//import Typography from "@material-ui/core/Typography";
import ImageUploader from 'react-images-upload';
//import { Multiselect } from 'multiselect-react-dropdown';

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Typography } from 'antd';
import {Input} from "@material-ui/core"
import $ from "jquery";
import { useHistory } from "react-router-dom";
import makeToast from "../../Toaster";
import withRouter from "react-router-dom/es/withRouter";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
//import Input from "@material-ui/core/Input";
import useTheme from "@material-ui/core/styles/useTheme";
import Chip from "@material-ui/core/Chip";
import axios from 'axios';
import FileUpload from '../../helpers/FileUpload'
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100vw",
        height: "100vh",
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));
function getStyles(item, list, theme) {
    return {
        fontWeight:
            list.indexOf(item) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const constSizeList = ["50X70","160X180","100X120"];
const constTagList = ["vehicle","people","music","view"];
const AddPoster= () => {
    const [pName,setPName]=React.useState("");
    const [creator,setCreator]=React.useState("");
    const [img,setImg]=React.useState([]);
    const [price,setPrice]=React.useState(0);
    const [sizeList,setSizeList]=React.useState([]);
    const [tagList,setTagList]=React.useState([]);
    const [amount,setAmount]=React.useState(1);

    let history = useHistory();
    const classes = useStyles();
    const theme = useTheme();

const onDrop=(newImages)=> {
        setImg(newImages);
    console.log(pName);
    console.log(img);
    console.log(price);
    console.log(creator);



};
    const handleNameChange = (e) => setPName(e.target.value);
    const handleCreatorChange = (e) => setCreator(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleTagListChange = (e) => setTagList(e.target.value);
    const handleSizeListChange = (e) => setSizeList(e.target.value);

    const onSuccess = () => {
        makeToast("info","Poster added succefully!");
        history.push('/stock')
    };
    const onFailure = error => {
        console.log(error);
        makeToast("error", error);
    };
    const onSubmitAddedHandler= (e) => {
        e.preventDefault();

        var data = {
            name: pName,
            creator: creator,
            img:img,
            price: price,
            sizeList: sizeList,
            tagList: tagList,
            amount: amount
        };
        axios.post("/add_poster",data).then(onSuccess)
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
                <Grid container spacing={1}>

                    <Grid item xs={12} >

                        <TextField
                            name="pName"
                            variant="outlined"
                            required
                            fullWidth
                            id="pName"
                            label="Name"
                            autoFocus
                            onChange={handleNameChange}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="creator"
                            label="Creator"
                            name="creator"
                            onChange={handleCreatorChange}
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
                            type="number"
                            onChange={handlePriceChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            name="amount"
                            label="Amount"
                            id="amount"
                            type="number"
                            onChange={(e )=> {setAmount(e.target.value)}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/*<ImageUploader
                        withIcon={true}
                        buttonText='Choose image'
                        onChange={onDrop}
                        maxFileSize={5242880}
                        imgExtension={['.jpg', '.gif', '.png', '.gif','.svg','.ico']}
                        label="Max of 5mb, excepted extensions are: .jpg , .gif, .png, .gif, .svg, .ico"
                        singleImage={true}
                        withPreview={true}
                    />*/}
                          <FileUpload refreshFunction={onDrop} />
                    </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-chip-label">Available Sizes</InputLabel>
                        <Select
                            labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                            value={sizeList}
                            onChange={handleSizeListChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {constSizeList.map((size) => (
                                <MenuItem key={size} value={size} style={getStyles(size, sizeList, theme)}>
                                    {size}
                                </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-chip-label">Tags</InputLabel>
                        <Select
                            labelId="mutiple-chip-label"
                            id="mutiple-chip"
                            multiple
                            value={tagList}
                            onChange={handleTagListChange}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} className={classes.chip} />
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {constTagList.map((tag) => (
                                <MenuItem key={tag} value={tag} style={getStyles(tag, tagList, theme)}>
                                    {tag}
                                </MenuItem>
                            ))}
                        </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                >
                    Add
                </Button>
            </form>
        </div>
    )
};
export default withRouter(AddPoster);
//                        imgExtension={['.jpg', '.gif', '.png', '.gif','svg']}
// <Multiselect
//     options={constSizeList}
//     selectedValues={sizeList} // Preselected value to persist in dropdown
//     onSelect={e => {setSizeList(e.target.value)}} // Function will trigger on select event
//     displayValue="Select Tags" // Property name to display in the dropdown options
//     maxWidth="xs"
// />