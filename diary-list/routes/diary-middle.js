const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
	console.log('first middle ware');
	next();
});

router.use((req, res, next) => {
	console.log('second middle ware');
	next();
});

router.use('/diary/:id', (req, res, next) => {
	console.log('/diary/' + req.params.id);

	if(req.params.id === '0') {
		console.log('0 ok');
		next('route');
	} else {
		console.log('0 not ok');
		next()
	}
}, (req, res, next) => {
	res.send('id is not 0')
});

router.route('/:id')
	.get((req, res, next) => {
		console.log('middle');

		if(req.params.id === '0') {
			console.log('what?!');
			next('route');
		} else {
			next();
		}
		console.log('test1');
	}, (req, res) => {
		console.log('end');

		res.send('test2');
	});

router.get('/diary/:id', (req, res) => {
	console.log('path : /diary/' + req.params.id);
	res.send('result');
});

module.exports = router;


