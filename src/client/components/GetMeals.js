import React, { useEffect, useState } from 'react';
import RenderMeals from './RenderMeals';

function GetMeals() {
    const [meals, setMeals] = useState([]);
    const [searchMeal, setSearchMeal] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (searchMeal === '') {
            setIsLoading(true);
            //get all meals if there is no search value 
            setTimeout(() => {
                fetch('/api/meals')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong ...');
                    }
                })
                .then(data => {
                    setIsLoading(false);
                    setMeals(data);
                })
                .catch(error => {
                    setError(error);
                    setIsLoading(false);
                }) 
            }, 20000);
            
        }
        else {
            setIsLoading(true);
            //search meal based on user input
            fetch(`/api/meals?title=${searchMeal}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong ...');
                    }
                })
                .then(data => {
                    setIsLoading(false);
                    setMeals(data);
                })
                .catch(error => {
                    setError(error);
                    setIsLoading(false);
                })
        }
    }, [searchMeal])//state will change when searchMeal is changed
    if (error) {
        return <p>{error.message}</p>;
    }
    if (isLoading) {
        return <p>Loading ...</p>;
    }
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

export default GetMeals;