const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    //to get meals that has a price smaller than maxPrice
    if ('maxPrice' in request.query) {
      const maxPrice = parseInt(request.query.maxPrice);
      if (isNaN(maxPrice)) {
        response.status(400).send({ error: "maxPrice should be an integer" });
        return;
      }
      const mealsLessThanMaxPrice = await knex("meal").where('price', '<', maxPrice);
      response.send(mealsLessThanMaxPrice);
    }

    //to get meals that still has available reservations
    if ('availableReservations' in request.query) {
      const availableReservations = request.query.availableReservations;
      console.log(availableReservations)
      if (availableReservations === 'true' || availableReservations === 'false') {
        const reservationSign = (availableReservations === 'true') ? '>' : '=';
        const mealswithAvailableReservations = await knex.raw(`SELECT
        meal.id AS meal_id, title, description, location, price, max_reservations, 
        COALESCE(SUM(number_of_guests), 0) AS total_reservations
    FROM
        meal
        LEFT JOIN reservation ON meal.id = meal_id
    GROUP BY
        meal.id
    HAVING
        max_reservations ${reservationSign} total_reservations`)
          .then(data => data[0]);
        response.send(mealswithAvailableReservations);
      }
    }

    //to get meals that partially match a title.
    if ('title' in request.query) {
      const title = request.query.title;
      const mealWithGivenTitle = await knex("meal").where('title', 'like', "%" + title + "%");
      response.send(mealWithGivenTitle);
    }

    //to get meals that has been created after the date
    if ('createdAfter' in request.query) {
      const createdAfter = request.query.createdAfter;
      if (!createdAfter) {
        response.status(404).send('must be a valid date.');
        return;
      }
      const mealsCreatedAfter = await knex("meal").where('created_date', '>', createdAfter);
      response.send(mealsCreatedAfter);
    }

    //to get specific number of meals
    if ('limit' in request.query) {
      const limit = parseInt(request.query.limit);
      if (isNaN(limit)) {
        response.status(400).send({ error: "limit must be an integer" });
        return;
      }
      const meals = await knex("meal").limit(limit);
      response.send(meals);
    }

    //Returns all meals
    const meals = await knex("meal");
    response.send(meals);
  }
  catch (error) {
    throw error;
  }
});

//Adds a new meal
router.post("/", async (request, response) => {
  try {
    const meals = await knex("meal").insert(request.body);
    response.json(meals);
  } catch (error) {
    throw error;
  }
});

//Returns meal by id
router.get("/:id", async (request, response) => {
  try {
    if ('id' in request.params) {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        response.status(404).json({ error: "IDs must be integers" })
        return
      }
      const mealWithId = await knex("meal").where({ id: id });
      response.json(mealWithId);
    }
  } catch (error) {
    throw error;
  }
});

//Updates the meal by id
router.put("/:id", async (request, response) => {
  try {
    if ('id' in request.params) {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        response.status(404).json({ error: "IDs must be integers" })
        return
      }
      const updatedMeal = await knex("meal").where({ id: id }).update(request.body);
      response.send(updatedMeal);
    }
  } catch (error) {
    throw error;
  }
});

//Deletes the meal by id
router.delete("/:id", async (request, response) => {
  try {
    if ('id' in request.params) {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        response.status(404).json({ error: "IDs must be integers" })
        return
      }
      const meals = await knex("meal").delete().where({ id: id });
      response.send(meals);
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
