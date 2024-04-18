const router = require("express").Router();
let Art = require("../models/art.model");

router.route("/arts").get((req, res) => {
  Art.find()
    .then((arts) => res.json(arts))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("art/:id").get((req, res) => {
  console.log("just id: " + req.params.id);
  Art.findById(req.params.id)
    .then((art) => res.json(art))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/art").post(async (req, res) => {
  const newArt = await new Art(req.body);

  console.log(newArt);

  newArt
    .save()
    .then(() => res.json("Art added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/art/:id").post(async (req, res) => {
  console.log(req.params.id);
  await Art.findById(req.params.id)
    .then((art) => {
      art.artName = req.body.artName;
      art.serial = req.body.serial;
      art.src = req.body.src;
      art.alt = req.body.alt;
      art.bids = req.body.bids;

      art
        .save()
        .then(() => res.json("Art updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/art/:id").delete(async (req, res) => {
  console.log("delete logged");
  await Art.findByIdAndDelete(req.params.id)
    .then(() => res.json("Art deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
