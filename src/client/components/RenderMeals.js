import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mealImage from '../meal-image.png';

function RenderMeals({ meal }) {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        //get all reviews
        fetch('/api/reviews')
            .then(response => response.json())
            .then(data => {
                setReviews(data);
            })
    }, [])

    let averageRating = 0;
    if (reviews.length > 0) {
        //filter reviews to find duplicate values
        const mealWithRating = reviews.filter(element => {
            if (meal.id === element.meal_id) {
                return element;
            }
        });
        if (mealWithRating.length > 1) {
            //if duplicate value is present finf the average rating using .reduce
            const duplicateRatingsInAMeal = mealWithRating.map(star => star.stars);
            const totalRatings = duplicateRatingsInAMeal
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            averageRating = totalRatings / duplicateRatingsInAMeal.length;
        }
        else {
            //if no duplicate values exist get the star value as average rating
            const averageRatingArray = mealWithRating.map(star => star.stars);//console.log->[5]
            averageRating = averageRatingArray[0];
        }
    }

    return (
        <div>
            <Link
                to={`/meals/${meal.id}`}>
                <img src={mealImage} />
                <br />
                <br />
                <span className="meal-title">{meal.title}</span>
            </Link>
            {averageRating ?
                <p>Rating: {averageRating}</p>
                :
                <p>Rating: No rating </p>
            }
            <br />
        </div>
    )
}

export default RenderMeals;
