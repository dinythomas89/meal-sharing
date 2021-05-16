const express = require("express");
const router = express.Router();
const knex = require("../database");

//Returns all reviews
router.get("/", async (request, response) => {
    try {
        const reviews = await knex("review");
        response.json(reviews);
    } catch (error) {
        throw error;
    }
});

//Adds a new review
router.post("/", async (request, response) => {
    try {
        const reviews = await knex("review").insert(request.body);
        response.json(reviews);
    } catch (error) {
        throw error;
    }
});

//Returns review by id
router.get("/:id", async (request, response) => {
    try {
        if ('id' in request.params) {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                response.status(404).json({ error: "IDs must be integers" })
                return
            }
            const reviews = await knex("review").where({ id: id });
            response.json(reviews);
        }
    } catch (error) {
        throw error;
    }
});

//Updates the review by id
router.put("/:id", async (request, response) => {
    try {
        if ('id' in request.params) {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                response.status(404).json({ error: "IDs must be integers" })
                return
            }
            const reviews = await knex("review").where({ id: id }).update(request.body);
            response.send(reviews);
        }
    } catch (error) {
        throw error;
    }
});

//Deletes the review by id
router.delete("/:id", async (request, response) => {
    try {
        if ('id' in request.params) {
            const id = parseInt(request.params.id);
            if (isNaN(id)) {
                response.status(404).json({ error: "IDs must be integers" })
                return
            }
            const reviews = await knex("review").delete().where({ id: id });
            response.send(reviews);
        }
    } catch (error) {
        throw error;
    }
});

module.exports = router;
