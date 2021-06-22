import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddReservation from './AddReservation';

const MealDetails = () => {
    //useParams to get the id value for meal
    const params = useParams(); //console.log->['id', 2]
    const [mealById, setMealById] = useState([]);
    const [availableMeals, SetAvailableMeals] = useState([]);
    const [isReservationAvailable, setIsReservationAvailable] = useState(true);
    const [viewForm, setViewForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    let filteredMeal;

    useEffect(() => {
        //fetch meal detail by getting the meal.id from meals
        fetch(`/api/meals/${params.id}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => {
                setIsLoading(false)
                console.log(data)
                setMealById(data[0]);
            })
            .catch(error => {
                setError(error)
                setIsLoading(false)
            })
    }, []);

    useEffect(() => {
        //to check whether reservations for particular meal is available
        fetch(`/api/meals?availableReservations=true`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => {
                setIsLoading(false)
                SetAvailableMeals(data)
            })
            .catch(error => {
                setError(error)
                setIsLoading(false)
            })

    }, []);

    if (availableMeals) {
        filteredMeal = availableMeals.filter((meal) => {
            if (meal.meal_id === mealById.id)
                return meal;
        })
    }

    const onClick = () => {
        //only when clicking the button will set the reservation form to be true
        // and check if available reservation is there or not
        setViewForm(true);
        if (filteredMeal.length === 0)
            setIsReservationAvailable(false);
    }
    
    if (error) {
        return <p>{error.message}</p>;
    }
    if (isLoading) {
        return <p>Loading ...</p>;
    }

    return (
        <div className="meal-details">
            <h1>Meal details</h1>
            <h3>{mealById.title}</h3>
            <p>{mealById.description}</p>
            <p>Location: {mealById.location}</p>
            <p>Price: {mealById.price}</p>
            <button onClick={onClick}>Reserve</button>
            <br />
            <br />
            <div>
                {viewForm ?
                    (isReservationAvailable
                        ? <AddReservation meal={filteredMeal} setForm={setViewForm} />
                        : `Sorry, no reservation is available for ${mealById.title}`)
                    : ''
                }
            </div>
        </div>
    )
}

export default MealDetails;