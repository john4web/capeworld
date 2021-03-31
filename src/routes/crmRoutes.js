import { getSuperHero } from "../controllers/crmController";
const routes = (app) => {
  app.route("/").get((req, res) => {
    res.json({
      message: "Root",
    });
  });

  app.route("/superhero/:id").get(getSuperHero);

  app.route("/testCollection").get((req, res) => {
    const messages = require("../db/messages");
    messages.getAll().then((messages) => {
      res.json(messages);
    });
  });
};

export default routes;
