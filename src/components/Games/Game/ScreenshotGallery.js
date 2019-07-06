import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import './Screenshot.css'

class GridGallery extends Component {
    render() { 

        const images = this.props.images.map((image) => {
            return ({
                src: `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${image}.jpg`,
                thumbnail: `https://images.igdb.com/igdb/image/upload/t_screenshot_med/${image}.jpg`,
                thumbnailWidth: 300,
                thumbnailHeight: 180,
            })
        })
        return (
            <Gallery 
            images={images}
            enableImageSelection={false} 
            backdropClosesModal={true} 
            showLightboxThumbnails={true}
            maxRows={2} 
            />
         );
    }
}
 
export default GridGallery;
