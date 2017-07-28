'use strict';

var express = require('express');
var multer = require('multer');
var controller = require('./gallery.controller');

var router = express.Router();
var upload = multer({ dest: 'client/assets/images/' });

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', upload.single('image'), controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
