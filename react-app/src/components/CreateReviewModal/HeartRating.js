import React, { useState } from "react";

function HeartRating({ onChange, value }) {
  const [rating, setRating] = useState(value || 0);

  const handleHeartClick = (index) => {
    const newRating = index + 1;

    if (newRating === Math.ceil(rating)) {
      setRating(0);
    } else {
      setRating(newRating);
    }

    onChange(newRating);
  };

  const renderHeartIcons = () => {
    const maxRating = 5;
    const heartIcons = [];

    for (let i = 0; i < maxRating; i++) {
      const heartType = i < rating ? "fullheart" : "emptyheart";

      heartIcons.push(
        <img
          key={i}
          src={process.env.PUBLIC_URL + `/images/${heartType}.svg`}
          alt="Heart"
          className="heart-image"
          onClick={() => handleHeartClick(i)}
        />
      );
    }

    return heartIcons;
  };

  return (
    <div className="heart-rating">
      <div className="heart-icons">{renderHeartIcons()}</div>
    </div>
  );
}

export default HeartRating;
