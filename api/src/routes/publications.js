const { Router } = require("express");
const publications = require("../schemas/Publications.js");
const mongoose = require("mongoose");
const publicationsController = require("../controllers/publications/index.js");
const { isAuthenticated, isModerator, isAdmin } = require("../middlewares");

const router = Router();

router.get("/", publicationsController.getAllPublications);

router.get("/:id", publicationsController.getPublicationsById);

router.post(
  "/",
  [isAuthenticated, isModerator],
  publicationsController.createPublications
);

router.patch(
  "/:id",
  [isAuthenticated, isAdmin],
  publicationsController.updatePublications
);

router.delete(
  "/:id",
  [isAuthenticated, isAdmin],
  publicationsController.deletePublications
);

module.exports = router;
