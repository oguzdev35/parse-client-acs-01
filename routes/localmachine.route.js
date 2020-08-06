const express = require('express');
const Parse = require('parse/node');

const router = express.Router();
const accessControlController = require('../controllers/accesscontrol.controller');

router.route('/access')
    .post(accessControlController.access)

module.exports = router;