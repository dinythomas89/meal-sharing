import React from 'react';
import { Link } from 'react-router-dom';
import mealImage from '../meal-image.png';

function RenderMeal({ meal }) {
    return (
        <div>
            <Link
                to={`/meals/${meal.id}`}>
                <img src={mealImage} />
                <br />
                {meal.title}
                <br />
            </Link>
        </div>
    )
}

export default RenderMeal;
