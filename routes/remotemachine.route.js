const express = require('express');
const Parse = require('parse/node');

const router = express.Router();

const administrationController = require('../controllers/administration.controller')


router.route('/createperson')
    .post(administrationController.createperson)

router.route('/createdoor')
    .post(administrationController.createdoor)

router.route('/getdoors')
    .get(administrationController.getdoors)

router.route('/getpersons')
    .get(administrationController.getpersons)

router.route('/updateperson')
    .post(administrationController.updateperson)

router.route('/updatedoor')
    .post(administrationController.updatedoor)

router.route('/deletedoor')
    .post(administrationController.deletedoor)

router.route('/deleteperson')
    .post(administrationController.deleteperson);

module.exports = router;