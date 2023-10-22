import Slider from 'react-slick'
import { SliderContainer,  ImageContainer, } from './Skins'
export default function Carousel(props:any) {
    const settings = {
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay : true,
        fade : true,
        arrows: true,
        // autoplaySpeed: 3000,
      };
  return (
    <SliderContainer>
     <Slider {...settings}>
    <div>
    <ImageContainer src={props.img1}/>
    </div>
    <div>
    <ImageContainer src={props.img2}  />
    </div>
    <div>
    <ImageContainer src={props.img3}  />
    </div>
    <div>
    <ImageContainer src={props.img4}  />
    </div>
    <div>
    <ImageContainer src={props.img5} />
    </div>
  </Slider> 
  </SliderContainer>
  )
}
