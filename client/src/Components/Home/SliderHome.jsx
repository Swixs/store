import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import firstImg from "../../Image/ImageSlider/firstGucci.png";
import secondImg from "../../Image/ImageSlider/secondIphone.png";
import thirdImg from "../../Image/ImageSlider/thirdPs5.png";

const SliderContainer = styled.div`
  position: relative;
  width: 70%;
  height: 300px;
  border: 3px solid white;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  align-items: center;
  background-color: black;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Slider = () => {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate("/Products");
  };

  const slides = [
    {
      id: 1,
      src: firstImg,
      alt: "Gucci",
      title: "Gucci Collection",
      description: "Up to 30% off Voucher",
      width: "30%",
    },
    {
      id: 2,
      src: secondImg,
      alt: "iPhone",
      title: "iPhone 14 Series",
      description: "Up to 20% off Voucher",
      width: "60%",
    },
    {
      id: 3,
      src: thirdImg,
      alt: "PlayStation 5",
      title: "PlayStation 5",
      description: "Up to 15% off Voucher",
      width: "40%",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  return (
    <SliderContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          display: "flex",
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.5s ease",
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            style={{
              flex: "0 0 100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px",
              color: "white",
            }}
          >
            <div style={{ flex: "0.4", padding: "10px" }}>
              <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
                {slide.title}
              </h2>
              <p style={{ fontSize: "40px", marginBottom: "20px" }}>
                {slide.description}
              </p>
              <button
                onClick={() => goToProducts()}
                style={{
                  paddingTop: "10px",
                  background: "none",
                  fontSize: "20px",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Shop now
              </button>
            </div>
            <div
              style={{
                flex: "0.6",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                style={{
                  width: slide.width,
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </SliderContainer>
  );
};

export default Slider;
