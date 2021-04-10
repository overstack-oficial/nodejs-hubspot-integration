const { Router } = require('express');

const Validation = require("./app/Midlewares/Validation")

const ContactController = require('./app/Controllers/ContactController');

const routes = new Router();

routes.get('/', Validation, ContactController.showAll);
routes.get('/contatos',  ContactController.show);
routes.post('/contato', ContactController.store);
routes.put('/contato/:id', ContactController.update);
routes.delete('/contato/:id', ContactController.remove);


module.exports = routes;