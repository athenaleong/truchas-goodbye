import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {ImageBox, Image, CarouselBox, CarouselSkeleton} from './style';
import Skeleton from 'react-loading-skeleton';

function ImgCarousel(props) {
    const {imgURL} = props; 

    const settings = {
        pauseOnHover: true,
        infinite:true,
        speed: 3000,
        autoplay: true,
        showThumbs: false,
        showStatus: false
    }

    const images = (imgURL || []).map(url => (
        <ImageBox key={url}>
            <Image src={url}/>
        </ImageBox>  
    )
    )
    return (
         <CarouselBox>
        {   
            (imgURL == undefined && <CarouselSkeleton />) || 
            (imgURL.length > 0 &&
            <Carousel infiniteLoop={true} interval={5000} autoPlay={true} showThumbs={false} showStatus={false} onClick={(e) => e.stopPropagation()}>
                {images}
            </Carousel>)
         }
        </CarouselBox> 
        
    )
}

export default ImgCarousel;