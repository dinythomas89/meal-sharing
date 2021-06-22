import React, { useEffect, useState } from 'react';
import RenderMeals from './RenderMeals';

function Meals() {
    const [meals, setMeals] = useState([]);
    const [searchMeal, setSearchMeal] = useState([]);

    useEffect(() => {
        if (searchMeal === '') {
            //get all meals if there is no search value 
            fetch('/api/meals')
                .then(response => response.json())
                .then(data => setMeals(data));
        }
        else {
            //search meal based on user input
            fetch(`/api/meals?title=${searchMeal}`)
                .then(response => response.json())
                .then(data => {
                    setMeals(data)
                });
        }
    }, [searchMeal])//state will change when searchMeal is changed

    return (
        <div className="meals">
            <h1>Meals</h1>
            <input className="search-bar" type="text"
                input={searchMeal}
                onChange={(e) => setSearchMeal(e.target.value)}
                placeholder="Search for a meal.."
            />
            <ul className="render-meals">
                {meals.length > 0 ?
                    meals.map(meal => {
                        return (
                            <li key={meal.id}>
                                <RenderMeals meal={meal} />
                            </li>
                        )
                    })
                    : 'No meals found'
                }
            </ul>
        </div>
    )
}

export default Meals;