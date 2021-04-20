//import { addNewContact, getContacts } from "../controllers/crmController";
import express from "express";
import {
  getHeroByID,
  getHeroesByNameFilter,
} from "../controllers/heroController";

const router = express.Router();

router.get("/hero/:heroID", getHeroByID);
router.get("/hero/name/:heroName", getHeroesByNameFilter);

//const routes = (app) => {
// app.route("/hero/:heroID").get(getHeroByID);
//app.route("/hero/name/:heroName").get(getHeroesByNameFilter);

// app.route("/").get((req, res) => {
//   res.json({
//     message: "Root",
//   });
// });

// app.route("/testCollection").get((req, res) => {
//   res.json({ messages: "abc" });
// });

// //route for post request
// app.route("/contact").post(addNewContact);

// //route for get request
// app.route("/contacts").get(getContacts);
//};

module.exports = router;
