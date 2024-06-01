import { SliderData } from "./SliderData";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import classes from "./Slider.module.css";
import { useEffect, useState } from "react";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideLength = SliderData.length;

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  let timeInterval = 3000;
  let slideInterval;

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    function auto() {
      slideInterval = setInterval(nextSlide, timeInterval);
    }
    auto();
    return () => {
      clearInterval(slideInterval);
    };
  }, [currentSlide, slideInterval]);

  return (
    <div className={classes.slider}>
      <AiOutlineArrowLeft className={classes.prev} onClick={prevSlide} />
      <AiOutlineArrowRight className={classes.next} onClick={nextSlide} />

      {SliderData.map((slide, index) => {
        return (
          <div
            key={index}
            className={
              index === currentSlide
                ? `${classes.slide} ${classes.current}`
                : `${classes.slide}`
            }>
            {index === currentSlide && (
              <div className={classes.slideFirstDiv}>
                <div className={classes["main-image"]}>
                  <img src={slide.image} alt={slide.heading} />
                </div>

                <div className={classes.content}>
                  <h3>{slide.heading}</h3>
                  <p>{slide.desc.slice(0, 30)}...</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
