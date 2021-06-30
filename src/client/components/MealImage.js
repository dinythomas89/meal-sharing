import React from 'react';
import mealImages from './mealImages';
import image from '../meal-image.png';

function MealImage({ mealTitle }) {
    console.log(mealTitle)
    let mealImage;

    mealImages.forEach(element => {
        if (element.title === mealTitle) {
            mealImage = element.image;
        }
        else {
            mealImage = image;
        }
    });

    return (
        <div>
            <img className="meal-image" src={mealImage} alt="meal image" />
        </div>
    )
}

export default MealImage;