import { Box, Button } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import img1 from "../assets/corouselImg/1.jpg";
import img2 from "../assets/corouselImg/2.jpg";
import img3 from "../assets/corouselImg/3.jpg";
import img4 from "../assets/corouselImg/4.jpg";
import img5 from "../assets/corouselImg/5.jpg";
import mm20 from "../assets/productImg/20mm.jpg";
import dust from "../assets/productImg/dust.jpg";
import msand from "../assets/productImg/msand.jpg";
import psand from "../assets/productImg/psand.jpg";
import wmm from "../assets/productImg/wmm.jpg";
import murum from "../assets/productImg/murum.jpg";

const HomePage = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable automatic slide scrolling
    autoplaySpeed: 2000, // Slide every 2 seconds
    arrows: true, // Add left/right arrows for manual navigation
  };

  return (
    <div className="homepage-container baskervville-sc-regular">
      <div className="home-section1">
        <div className="homeButtons-container">
          <h1>Welcome to the <br /> PVS Infra-resources</h1>
          <Box className="HomeButtons-Box">
            <Link to="/dashboard">
              <Button variant="contained" fullWidth>
                Dashboard page
              </Button>
            </Link>
            <a href="#aboutus">
              <Button variant="contained" fullWidth>
                About us
              </Button>
            </a>
            <a href="#ourproducts">
              <Button variant="contained" fullWidth>
                Our Products
              </Button>
            </a>
            <a href="#contactus">
              <Button variant="contained" fullWidth>
                Contact us
              </Button>
            </a>
            <Link to="/about-website">
              <Button variant="contained" fullWidth>
                About the website
              </Button>
            </Link>
            <div className="read-more" >
              <p>
                <a href="#aboutus">Please read more</a>
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="#000000"
              >
                <path d="M444-768v438L243-531l-51 51 288 288 288-288-51-51-201 201v-438h-72Z" />
              </svg>
            </div>
          </Box>
        </div>
        <div className="corousel-container">
          <Slider {...settings}>
            <div>
              <img className="courouselImg" src={img1} alt="Image 1" />
            </div>
            <div>
              <img className="courouselImg" src={img2} alt="Image 2" />
            </div>
            <div>
              <img className="courouselImg" src={img3} alt="Image 3" />
            </div>
            <div>
              <img className="courouselImg" src={img4} alt="Image 4" />
            </div>
            <div>
              <img className="courouselImg" src={img5} alt="Image 5" />
            </div>
          </Slider>
        </div>
      </div>
      <section id="aboutus" className="aboutus-section">
        <div>
          <h3 style={{color: "#03282c"}}>Thank you for visiting us.</h3>
          <h3>
            We at JD PVS Infra-resources bring you the range of products for all
            your construction needs.<br></br>Our products offer significant
            advantage to the old methods, be it the road or your house
            contruction.<br></br>With the stronger grip with the dust, or with
            the Murum that offers proven stability, all our products are the
            gateway to the stronger foundation and centuries lasting Future.
            <br></br>ALL PRODUCTS PROVIDE ISI MARK QUALITY.
          </h3>
        </div>
      </section>
      <section id="ourproducts" className="products-section">
        <h2>Our fleet of products-</h2>
        <div className="products-subsection">
          <div className="product-cards">
            <div>
              <h3>Manifacture Sand (Concrete)</h3>
              Artificial sand used as a substitute for river sand in concrete and mortar
            </div>
            <img className="productImg" src={msand} alt="20mm Pic" />
          </div>
          <div className="product-cards">
            <div>
              <h3>Plaster Sand</h3>
              Fine sand used for plastering walls and ceilings for a smooth finish.
            </div>
            <img className="productImg" src={psand} alt="20mm Pic" />
          </div>
          <div className="product-cards">
            <div>
              <h3>WMM</h3>
              (Wet Mix Macadam): Mixture of crushed aggregates and water used as a road base layer.
            </div>
            <img className="productImg" src={wmm} alt="20mm Pic" />
          </div>
          <div className="product-cards">
            <div>
              <h3>Dust</h3>
              Fine rock particles used for compacting surfaces and filling voids.
            </div>
            
            <img className="productImg" src={dust} alt="20mm Pic" />
          </div>
          <div className="product-cards">
            <div>
              <h3>Murum</h3>
              Natural soil or soft rock used for filling and leveling foundations.
            </div>
            
            <img className="productImg" src={murum} alt="20mm Pic" />
          </div>
          <div className="product-cards">
            <div>
              <h3>20mm</h3>
              Crushed stone used in concrete mixes and road construction for strength.
            </div>
            <img className="productImg" src={mm20} alt="20mm Pic" />
          </div>
        </div>
      </section>
      <section id="contactus" className="contact-section">
        <div>
          <h2 style={{color: "#03282c"}}>Do reach out</h2>
          <h3>Email :- pvsinfraR@gmail.com  </h3> 
          <h3>Instagram :- @PVSINFRARESOURCESINDIA </h3>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
