import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import LoadedImageUrl from "components/utils/loaded-image-url";

import "components/slideshow/slideshow.scss";

const Slideshow = ({ images = [], imageURLs }) => {
  let [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  let [fullScreenMode, setFullScreenMode] = useState(false);

  const btnFullScreenRef = useRef(null);
  const btnCloseRef = useRef(null);
  const slideshowRef = useRef(null);
  const buttonRefs = useRef([]);

  const decrementSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    } else {
      setCurrentSlideIndex(images.length - 1);
    }
  };
  const incrementSlide = () => {
    if (currentSlideIndex < images.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      setCurrentSlideIndex(0);
    }
  };
  const changeSlide = (index) => {
    setCurrentSlideIndex(index);
  };
  const enterFullScreen = () => {
    setFullScreenMode(true);

    slideshowRef.current.focus();
  };
  const closeFullScreen = () => {
    setFullScreenMode(false);
  };
  const handleScreenClick = (event) => {
    if (!slideshowRef.current.contains(event.target)) {
      setFullScreenMode(false);
    }
  };
  // Helps VoiceOver stop scrolling the page
  const preventDefaultFunc = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  };
  const keyUpHandler = (event) => {
    if (event.key === "Escape") {
      closeFullScreen();
    }
    if (event.key === "ArrowRight") {
      // advance slides
      incrementSlide();
    }
    if (event.key === "ArrowLeft") {
      // reverse slides
      decrementSlide();
    }
  };
  const keyUpNavFocusHandler = (event, index) => {
    // move focus to next slide dot if arrow right pressed
    if (event.key === "ArrowRight") {
      if (index < images.length - 1) {
        buttonRefs.current[index + 1].focus();
      } else {
        buttonRefs.current[0].focus();
      }
    }
    // move focus to previous slide dot if arrow left pressed
    if (event.key === "ArrowLeft") {
      if (index > 0) {
        buttonRefs.current[index - 1].focus();
      } else {
        buttonRefs.current[images.length - 1].focus();
      }
    }
  };

  return (
    <>
      <button
        aria-label='Full screen view'
        className='btn-slideshow-fullscreen'
        onClick={enterFullScreen}
        ref={btnFullScreenRef}
        type='button'>
        <span className='icon'></span>
      </button>
      <div
        className={`inspiration-slideshow ${fullScreenMode ? "fullscreen" : ""}`}
        onClick={(event) => handleScreenClick(event)}
        onKeyDown={preventDefaultFunc}
        onKeyUp={(event) => {
          keyUpHandler(event);
        }}>
        <div
          aria-live='polite'
          aria-roledescription='Image SlideShow'
          role={fullScreenMode ? "application" : "region"}
          className='slideshow-container'
          ref={slideshowRef}
          tabIndex='-1'>
          <div>
            <button
              aria-label='Close full screen view'
              className='btn-slideshow-close'
              onClick={closeFullScreen}
              ref={btnCloseRef}
              type='button'>
              X
            </button>
          </div>
          {images.map((image, index) => {
            const imageUrl = imageURLs ? LoadedImageUrl(imageURLs, image.src) : image.src;
            return (
              <figure
                aria-describedby={`count-${index}`}
                aria-labelledby={`img-${index} caption-${index}`}
                className={`slide fade ${currentSlideIndex === index ? "active" : ""}`}
                key={index}>
                <div className='numbertext' id={`count-${index}`}>
                  {index + 1} / {images.length}
                </div>
                <img src={imageUrl} alt={image.alt} style={{ width: "100%" }} id={`img-${index}`} />
                <figcaption className='text' id={`caption-${index}`}>
                  {image.caption}
                </figcaption>
              </figure>
            );
          })}

          <button
            aria-label='Previous slide'
            className='prev'
            onClick={() => decrementSlide()}
            type='button'>
            <span aria-hidden='true'>&#10094;</span>
          </button>
          <button
            aria-label='Next slide'
            className='next'
            onClick={() => incrementSlide()}
            type='button'>
            <span aria-hidden='true'>&#10095;</span>
          </button>
        </div>
        <br />

        <nav aria-label='slides'>
          <ul className='dots'>
            {images.map((image, index) => (
              <li key={index}>
                <button
                  aria-label={`Slide ${index + 1}`}
                  className={`dot ${currentSlideIndex === index ? "active" : ""}`}
                  onClick={() => changeSlide(index)}
                  onKeyUp={(event) => {
                    // move focus to next slide dot if arrow right pressed
                    keyUpNavFocusHandler(event, index);
                  }}
                  ref={(elementRef) => {
                    buttonRefs.current.push(elementRef);
                  } }

                  tabIndex={currentSlideIndex === index ? "0" : "-1"}
                ></button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

Slideshow.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
      caption: PropTypes.string,
    })
  ),
  imageURLs: PropTypes.object,
};

export default Slideshow;
