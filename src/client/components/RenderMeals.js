import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mealImage from '../meal-image.png';

function RenderMeals({ meal }) {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        //get all reviews
        fetch('/api/reviews')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => {
                setIsLoading(false);
                setReviews(data);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
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

    if (error) {
        return <p>{error.message}</p>;
    }
    if (isLoading) {
        return <p>Loading ...</p>;
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
