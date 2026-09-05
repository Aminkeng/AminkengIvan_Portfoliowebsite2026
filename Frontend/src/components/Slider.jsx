import { useCallback, useEffect, useRef, useState } from "react";
import './Styles/slider.css';
import Slide1 from '../assets/Slide1.jpg';
import Slide3 from '../assets/Slide3.jpg';
import project1 from '../assets/project1.jpg';
import Thumbnail from '../assets/Thumbnail.jpg';
import Skull from '../assets/Skull.png';
// import burger from '../assets/burger.jpg';

const IMAGES = [
  { id: 1, img: Slide1,     name: "Switzerland" },
  { id: 2, img: Slide3,     name: "Finland"     },
  { id: 3, img: project1,   name: "Iceland"     },
  { id: 4, img: Thumbnail,  name: "Australia"   },
  { id: 5, img: Skull,      name: "Netherland"  },
  // { id: 6, img: burger,     name: "Ireland"     },
];

export default function Slider() {
  const [items, setItems]         = useState(IMAGES);
  const [direction, setDirection] = useState("next");
  const animating = useRef(false);

  const rotate = useCallback((dir) => {
    if (animating.current) return;
    animating.current = true;
    setDirection(dir);

    // Pre-set direction class BEFORE updating items so the
    // entering item starts from the correct off-screen position.
    requestAnimationFrame(() => {
      setItems((prev) =>
        dir === "next"
          ? [...prev.slice(1), prev[0]]
          : [prev[prev.length - 1], ...prev.slice(0, -1)]
      );
      setTimeout(() => { animating.current = false; }, 500);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => rotate("next"), 5000);
    return () => clearInterval(interval);
  }, [rotate]);

  return (
    <div className={`container dir-${direction}`}>
      <div className="slide">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`item pos-${index}`}
            style={{ backgroundImage: `url(${item.img})` }}
          />
        ))}
      </div>

      <div className="button">
        <button className="prev" onClick={() => rotate("prev")} aria-label="Previous slide">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button className="next" onClick={() => rotate("next")} aria-label="Next slide">
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
