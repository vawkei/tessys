import classes from "./HomeInfoBox.module.css";
import ProductCarousel from "../carousel/ProductCarousel";
import Button from "../ui/button/Button";
import SlidePage from "../../pages/SlidePage";
import HomeInfoBox from "./HomeInfoBox";

const Home = () => {
  const newsletterSubscriptionHandler = async () => {
    //console.log("sending subscription...");
    // await dispatch(newsletterSubscription());
  };

  return (
    <div>
      <SlidePage />
      <HomeInfoBox />
      <ProductCarousel />
      <div className={classes.subscribe}>
        <Button onClick={newsletterSubscriptionHandler} className={classes.btn}>
          Subscribe to newsletter
        </Button>
      </div>
    </div>
  );
};

export default Home;
