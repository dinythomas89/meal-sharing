import React, { useState } from 'react';
import postData from './postData';

function ReservationForm({ meal, setForm }) {
    const initialValues = {
        noOfGuests: "",
        name: "",
        email: "",
        phoneNumber: ""
    };
    const [values, setValues] = useState(initialValues);
    const numberOfReservationsAvailable = parseInt(meal[0].max_reservations)
        - parseInt(meal[0].total_reservations);

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
            number_of_guests: values.noOfGuests,
            contact_name: values.name,
            contact_email: values.email,
            contact_phonenumber: values.phoneNumber,
            meal_id: meal[0].meal_id,
            created_date: new Date().toISOString().split('T')[0]
        }
        const response = postData('api/reservations', formData)
        if (response) {
            const message = `Your reservation for ${values.noOfGuests} persons is booked`
            alert(message)
        }
        else {
            alert(`The reservation was not successful. Please try again..`)
        }
        setForm(false)
    }

    return (
        <form >
            <h2>Reservation form</h2>
            <div>Available reservations: {numberOfReservationsAvailable}</div>
            <br />
            <p className="important-message">Please fill out all the fields</p>
            <label>
                <input
                    type="number"
                    value={values.noOfGuests}
                    onChange={handleInputChange}
                    name="noOfGuests"
                    min="1"
                    placeholder="Number of guests"
                />
                *
            </label>
            <br />
            <label>
                <input
                    type="text"
                    value={values.name}
                    onChange={handleInputChange}
                    name="name"
                    placeholder="Name"
                />
                *
            </label>
            <br />
            <label>
                <input
                    type="email"
                    value={values.email}
                    onChange={handleInputChange}
                    name="email"
                    placeholder="Email"
                />
                *
            </label>
            <br />
            <label>
                <input
                    type="tel"
                    value={values.phoneNumber}
                    onChange={handleInputChange}
                    name="phoneNumber"
                    placeholder="Phone number"
                />
                *
            </label>
            <br />
            <button onClick={onSubmit} >Submit</button>
        </form>
    )
}

export default ReservationForm