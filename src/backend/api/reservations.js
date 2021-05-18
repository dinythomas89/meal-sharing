const express = require("express");
const router = express.Router();
const knex = require("../database");

//Returns all reservations
router.get("/", async (request, response) => {
  try {
    const reservations = await knex("reservation");
    response.json(reservations);
  } catch (error) {
    throw error;
  }
});

//Adds a new reservation
router.post("/", async (request, response) => {
  try {
    const reservations = await knex("reservation").insert(request.body);
    response.json(reservations);
  } catch (error) {
    throw error;
  }
});

//Returns reservation by id
router.get("/:id", async (request, response) => {
  try {
    if ('id' in request.params) {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        response.status(404).json({ error: "IDs must be integers" })
        return
      }
      const reservations = await knex("reservation").where({ id: id });
      response.json(reservations);
    }
  } catch (error) {
    throw error;
  }
});

//Updates the reservation by id
router.put("/:id", async (request, response) => {
  try {
    if ('id' in request.params) {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        response.status(404).json({ error: "IDs must be integers" })
        return
      }
      const reservations = await knex("reservation").where({ id: id }).update(request.body);
      response.send(reservations);
    }
  } catch (error) {
    throw error;
  }
});

//Deletes the reservation by id
router.delete("/:id", async (request, response) => {
  try {
    if ('id' in request.params) {
      const id = parseInt(request.params.id);
      if (isNaN(id)) {
        response.status(404).json({ error: "IDs must be integers" })
        return
      }
      const reservations = await knex("reservation").delete().where({ id: id });
      response.send(reservations);
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
