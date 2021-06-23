import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddReservation from './AddReservation';
import AddReview from './AddReview';

const MealDetails = () => {
    //useParams to get the id value for meal
    const params = useParams(); //console.log->['id', 2]
    const [mealById, setMealById] = useState([]);
    const [availableMeals, SetAvailableMeals] = useState([]);
    const [isReservationAvailable, setIsReservationAvailable] = useState(true);
    const [viewReservationForm, setViewReservationForm] = useState(false);
    const [viewReviewForm, setViewReviewForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    let filteredMeal;

    useEffect(() => {
        setIsLoading(true);
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
                setIsLoading(false);
                setMealById(data[0]);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            })
    }, []);

    useEffect(() => {
        setIsLoading(true);
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
                setIsLoading(false);
                SetAvailableMeals(data);
            })
            .catch(error => {
                setError(error);
                setIsLoading(false);
            })

    }, []);

    if (availableMeals) {
        filteredMeal = availableMeals.filter((meal) => {
            if (meal.meal_id === mealById.id)
                return meal;
        })
    }

    const onReservationClick = () => {
        //only when clicking the button will set the reservation form to be true
        // and check if available reservation is there or not
        setViewReservationForm(true);
        setViewReviewForm(false);
        if (filteredMeal.length === 0)
            setIsReservationAvailable(false);
    }
    const onReviewClick = () => {
        setViewReviewForm(true);
        setViewReservationForm(false);
    }

    if (error) {
        return <p>{error.message}</p>;
    }
    if (isLoading) {
        return <p>Loading ...</p>;
    }

    return (
        <div className="meal-details">
            <section>
                <h1>Meal details</h1>

                <h3>{mealById.title}</h3>
                <p>{mealById.description}</p>
                <p>Location: {mealById.location}</p>
                <p>Price: {mealById.price}</p>
                <button onClick={onReservationClick}>Reserve</button>
                <br />
                <br />
                <button onClick={onReviewClick}>Add Review</button>
                <br />
                <br />
                <div>
                    {viewReservationForm ?
                        (isReservationAvailable
                            ? <AddReservation meal={filteredMeal} setReservationForm={setViewReservationForm} />
                            : `Sorry, no reservation is available for ${mealById.title}`)
                        : ''
                    }
                </div>
                <div>
                    {viewReviewForm ?
                        <AddReview meal={mealById} setReviewForm={setViewReviewForm} /> : ''}
                </div>
                <br />
            </section>
        </div>
    )
}

export default MealDetails;