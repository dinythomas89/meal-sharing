import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReservationForm from './ReservationForm';

const MealDetails = () => {
    const params = useParams();
    const [mealById, setMealById] = useState([]);
    const [availableMeals, SetAvailableMeals] = useState([]);
    const [isReservationAvailable, setIsReservationAvailable] = useState(true);
    const [viewForm, setViewForm] = useState(false);
    let filteredMeal;

    useEffect(() => {
        fetch(`/api/meals/${params.id}`)
            .then(res => res.json())
            .then(data => {
                setMealById(data[0]);
            })
    }, []);

    useEffect(() => {
        fetch(`/api/meals?availableReservations=true`)
            .then(res => res.json())
            .then(data =>
                SetAvailableMeals(data));
    }, []);

    if (availableMeals) {
        filteredMeal = availableMeals.filter((meal) => {
            if (meal.meal_id === mealById.id)
                return meal;
        })
    }

    const onClick = () => {
        setViewForm(true);
        if (filteredMeal.length === 0)
            setIsReservationAvailable(false);
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
                        ? <ReservationForm meal={filteredMeal} setForm={setViewForm} />
                        : `Sorry, no reservation is available for ${mealById.title}`)
                    : ''
                }
            </div>
        </div>
    )
}

export default MealDetails;