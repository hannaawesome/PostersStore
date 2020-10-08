import React, {Component} from 'react';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

export default function UpdateUserDetails({ user }) {
    function DeleteUserItemHandler(e) {
    }
        return (
            <div>
                <IconButton
                    aria-label="Delete"
                    onClick={DeleteUserItemHandler}
                >
                    <DeleteIcon/>
                </IconButton>
            </div>
        );

}
