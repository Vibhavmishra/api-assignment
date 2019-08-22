var person_controller = require('../controllers/person.controller');

module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
        res.header('Access-Control-Allow-Headers', 'accept');
        next();
    })

    app.get('/api/person', person_controller.getPerson);
    app.post('/api/person', person_controller.addPerson);
    app.put('/api/person', person_controller.updatePerson);
    app.delete('/api/person/:id', person_controller.deletePerson);
}