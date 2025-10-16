import { Router } from "express";
import { wishlistController } from "./wishlist.controller";
import { auth } from "../../middlewares/auth.middleware";
//import { authMiddleware } from "../../middlewares/auth.middleware";
// JWT middleware

const router = Router();

 router.use(auth());

// router.use(authMiddleware);
router.get("/wishlists", wishlistController.getAllWishlist);

router.get("/wishlists/:userId", wishlistController.getUserWishlist);

router.post("/wishlists", wishlistController.addToWishlist);

router.delete("/wishlists/:wishlistId", wishlistController.removeFromWishlist);

export const wishlistRoute = router;
