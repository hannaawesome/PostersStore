import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';
import Chip from "@material-ui/core/Chip";
import DeleteIcon from '@material-ui/icons/Delete';
function PosterInfo(props) {

    const [poster, setPoster] = useState({});

    useEffect(() => {

        setPoster(props.detail)

    }, [props.detail]);

    const deleteHandler = () => {
        props.deletePoster(props.detail._id)
    };


    return (
        <div>
            <Descriptions title={poster.creator}>
                <Descriptions.Item label="Price"> {poster.price}</Descriptions.Item>
                <Descriptions.Item label="Amount">{poster.amount}</Descriptions.Item>
                <Descriptions.Item label="Tags"> {poster.tagList!==undefined&&poster.tagList!==[]?poster.tagList.map((s)=>(<Chip key={s} label={s}/>)):null}</Descriptions.Item>
                <Descriptions.Item label="Sizes">  {poster.sizeList!==undefined&&poster.tagList!==[]?poster.sizeList.map((s)=>(<Chip key={s} label={s}/>)):null}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round"
                        onClick={deleteHandler}
                >
                    <DeleteIcon/>
                </Button>
            </div>
        </div>
    )
}

export default PosterInfo
