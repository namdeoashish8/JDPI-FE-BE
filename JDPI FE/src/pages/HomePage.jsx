import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const HomePage = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
        <div>
          <h1>Welcome to the Homepage</h1>
          <p>This content is only visible on the main page.</p>
          {/* Add any other elements you want specifically for the homepage */}
        </div>
        <div className="corousel-container">
        <Slider {...settings}>
          <div>
            <img className="courouselImg" src="./src/assets/corouselImg/1.jpg" alt="Image 1" />
          </div>
          <div>
          <img className="courouselImg" src="./src/assets/corouselImg/2.jpg" alt="Image 1" />
          </div>
          <div>
          <img className="courouselImg" src="./src/assets/corouselImg/3.jpg" alt="Image 1" />
          </div>
          <div>
          <img className="courouselImg" src="./src/assets/corouselImg/4.jpg" alt="Image 1" />
          </div>
          <div>
          <img className="courouselImg" src="./src/assets/corouselImg/5.jpg" alt="Image 1" />
          </div>
        </Slider>
        </div>
    </div>
  )
}

export default HomePage
