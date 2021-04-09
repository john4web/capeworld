import {
  getSuperHero,
  addNewContact,
  getContacts,
} from "../controllers/crmController";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.json({
      message: "Root",
    });
  });

  app.route("/superhero/:heroID").get(getSuperHero);

  app.route("/testCollection").get((req, res) => {
    res.json({ messages: "abc" });
  });

  //route for post request
  app.route("/contact").post(addNewContact);

  //route for get request
  app.route("/contacts").get(getContacts);
};

export default routes;
