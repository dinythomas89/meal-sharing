import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import postData from './postData';

function AddMeal() {
    const initialValues = {
        title: "",
        description: "",
        location: "",
        max_reservations: "",
        price: ""
    };
    const [values, setValues] = useState(initialValues);
    const [startDate, setStartDate] = useState();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const formatDate = (date) => {
        let d = new Date(date)
        return `${d.getFullYear()}-${d.getMonth().toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    }
    const formattedDate = formatDate(startDate)

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = {
            title: values.title,
            description: values.description,
            location: values.location,
            when: formattedDate,
            max_reservations: values.max_reservations,
            price: values.price,
            created_date: new Date().toISOString().split('T')[0]
        }
        const response = postData('api/meals', formData)
        if (response) {
            alert('you added a meal');
            setValues(initialValues);
            setStartDate('')
        }
    }

    return (
        <form className="new-meal">
            <h2>Add a meal</h2>
            <p className="important-message">Please fill out all the fields</p>
            <br />
            <input
                type="text"
                value={values.title}
                onChange={handleInputChange}
                name="title"
                placeholder="Title"
            />
            <br />
            <input
                type="text"
                value={values.description}
                onChange={handleInputChange}
                name="description"
                placeholder="Description"
            />
            <br />
            <input
                type="text"
                value={values.location}
                onChange={handleInputChange}
                name="location"
                placeholder="Location"
            />
            <br />
            <DatePicker className="date-picker"
                dateFormat="yyyy-MM-dd"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={new Date()}
                placeholderText="yyyy-mm-dd"
            />
            <br />
            <input
                type="number"
                value={values.max_reservations}
                onChange={handleInputChange}
                name="max_reservations"
                min="1"
                placeholder="Maximum reservations"
            />
            <br />
            <input
                type="number"
                value={values.price}
                onChange={handleInputChange}
                name="price"
                placeholder="Price"
            />
            <br />
            <button onClick={onSubmit} >Submit</button>
            <br />
            <br />
        </form>
    )
}

export default AddMeal;