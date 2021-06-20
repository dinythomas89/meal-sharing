import React, { useEffect, useState } from 'react';
import RenderMeal from './RenderMeal';

function Meals() {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetch('/api/meals')
            .then(response => response.json())
            .then(data => setMeals(data));
    }, []);

    return (
        <div className="meals">
            <h1>Meals</h1>
            <ul className="render-meals">
            {meals.map(meal => {
                    return (
                        <li key={meal.id}>
                            <RenderMeal meal={meal} />
                            <br />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Meals;