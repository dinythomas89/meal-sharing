import React, { useState } from "react";
import './StarRating.css';

/*For giving the star rating to reviews
reference->codesandbox.io/embed/v0n20v6143 */
const Star = ({ selected = false, onClick = f => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick} />
);

const StarRating = ({ totalStars, isStarSelected }) => {
  console.log(isStarSelected)
  const [starsSelected, selectStar] = useState(0);

  return (
    <div className="star-rating">
      {isStarSelected ?
        (
          [...Array(totalStars)].map((n, i) => (
            <Star
              key={i}
              selected={i < starsSelected}
              onClick={() => selectStar(i + 1)}
            />
          )))
        :
        (
          <div className="star-rating">
            {[...Array(totalStars)].map((n, i) => (
              <Star key={i} />
            ))}
          </div>
        )}
    </div>
  )
}


export default StarRating;