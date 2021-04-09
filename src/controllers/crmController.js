import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel";

const Contact = mongoose.model("Contact", ContactSchema);

//saving a new contact to the database and sends it back to Vue.js
export const addNewContact = (req, res) => {
  let newContact = new Contact(req.body);

  newContact.save((err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};

//fetches contacts from the database and sends it back to Vue.js
export const getContacts = (req, res) => {
  Contact.find({}, (err, contact) => {
    if (err) {
      res.send(err);
    }
    res.json(contact);
  });
};

export const getSuperHero = (req, res) => {
  const heroID = req.params.heroID;
  console.log(heroID);
  res.json({ name: "Superman" });
};
