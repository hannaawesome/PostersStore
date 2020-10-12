import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

function PosterImage(props) {
    const [Images, setImages] = useState([]);

    useEffect(() => {
        if (props.detail.img&& props.detail.img.length > 0) {
            let images = [];

            props.detail.img.map(item => {
                images.push({
                    original: item,
                    thumbnail: item
                })
            });
            setImages(images)
        }
    }, [props.detail]);

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default PosterImage