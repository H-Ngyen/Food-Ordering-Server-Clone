import express from "express"
import { param } from "express-validator"
import RestaurantController from "../controllers/RestaurantController"
import { jwtCheck, jwtParse } from "../middleware/auth"
const router = express.Router()

// /api/restaurant/search/london
router.get("/search/:city", param("city").isString().trim().notEmpty().withMessage("City parameter must be a valid string"),RestaurantController.searchRestaurant)
router.get("/:restaurantId",  param("restaurantId").isString().trim().notEmpty().withMessage("Restaurant ID parameter must be a valid string"),RestaurantController.getRestaurant)

export default router