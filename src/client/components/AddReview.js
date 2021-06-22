import React, { useState } from 'react';
import postData from './postData';

function AddReview({ meal, setReviewForm }) {
    const initialValues = {
        title: "",
        description: "",
        stars: ""
    };
    const [values, setValues] = useState(initialValues);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = {
            title: values.title,
            description: values.description,
            stars: values.stars,
            meal_id: meal.id,
            created_date: new Date().toISOString().split('T')[0]
        }
        const response = postData('api/reviews', formData);
        if (response) {
            alert(`Thank you for your feedback`);
        }
        else {
            alert(`The feedback was not successful. Please try again..`);
        }
        setReviewForm(false);
    }

    return (
        <form >
            <h2>Review form</h2>
            <p className="important-message">Please fill out all the fields</p>
            <input
                type="text"
                value={values.title}
                onChange={handleInputChange}
                name="title"
                placeholder="Title"
                required
            />
            <br />
            <input
                type="text"
                value={values.description}
                onChange={handleInputChange}
                name="description"
                placeholder="Description"
                required
            />
            <br />
            <input
                type="number"
                value={values.stars}
                onChange={handleInputChange}
                name="stars"
                placeholder="Rating"
                required
            />
            <br />
            <button onClick={onSubmit} >Submit</button>
        </form>
    )
}

export default AddReview;