import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./Responsive";
import classes from "./CarouselItems.module.css";
import Button from "../ui/button/Button";
import { carouselDataGames } from "./CarousalData";
import { carouselDataWatches } from "./CarousalData";
import Card from "../ui/card/Card";
import { useNavigate } from "react-router-dom";

var nairaSymbol = "\u20A6";

const ProductCarousel = () => {
  const navigate = useNavigate();

  const navigateToShopHandler = () => {
    navigate("/shop");
  };

  const games = carouselDataGames.map((data) => {
    return (
      <div key={data._id}>
        <Card  className={classes.cardClass}>
          <img src={data.url} alt="product image" />
          <div className={classes.content}>
            <h2>{data.name}</h2>
            <p>
              {nairaSymbol}
              {data.price}
            </p>
            <p>{data.description}</p>
            <div className={classes.action}>
              <Button className={classes.btn} onClick={navigateToShopHandler}>
                Order Now
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  });


  const watches = carouselDataWatches.map((data)=>{
    return(
        <div key={data._id}>
        <Card  className={classes.cardClass}>
          <img src={data.url} alt="product image" />
          <div className={classes.content}>
            <h2>{data.name}</h2>
            <p>
              {nairaSymbol}
              {data.price}
            </p>
            <p>{data.description}</p>
            <div className={classes.action}>
              <Button className={classes.btn} onClick={navigateToShopHandler}>
                Order Now
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  })

  return (
    <div className={classes.container}>
        <h1>Games</h1>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={300}
        customTransition="all 500ms ease"
        transitionDuration={1000}
        showDots={false}
        arrows={false}
        >
        {games}
      </Carousel>

      <h1>Watches</h1>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={300}
        customTransition="all 500ms ease"
        transitionDuration={1000}
        showDots={false}
        arrows={false}
        >
        {watches}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;