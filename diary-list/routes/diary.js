const express = require('express');
const router = express.Router();
const db = require('../db-pg');
const getStringedDate = require('../utils/date');

router.route('/')
	.get(async (req, res) => {
		try {
			const result = await db.query('SELECT id, emotion_id as "emotionId", content, created_date as "createdDate" FROM diary_list');
			res.json(result.rows);
		} catch (err) {
			console.error(err);
			res.status(500).send('Internal Server Error');
		}
	})
	.post(async (req, res) => {
		const diary = req.body;

		try {
			const createdDate = getStringedDate(new Date(diary.createdDate));
			const result = await db.query(`INSERT INTO diary_list (content, emotion_id, created_date) VALUES ('${diary.content}', ${diary.emotionId}, '${createdDate}'::timestamp)`);
			res.json(result.rows);
		} catch (err) {
			console.error(err);
			res.status(500).send('Internal Server Error');
		}
	})
	.patch(async (req, res) => {
		const diary = req.body;

		try {
			const findDiary = await db.query(`SELECT * FROM diary_list WHERE id = ${diary.id}`);

			if(!findDiary) {
				console.log('not found diary');
				return;
			}

			const createdDate = getStringedDate(new Date(diary.createdDate));
			const result = await db.query(`UPDATE diary_list SET emotion_id = ${diary.emotionId}, content = '${diary.content}', created_date = '${createdDate}'::timestamp WHERE id = ${diary.id}`)

			res.json(result.rows);
		} catch (err) {
			console.error(err);
			res.status(500).send('Internal Server Error');
		}
	});

router
	.route('/:id')
	.get(async (req, res) => {
		const id = req.params.id;
		console.log(id);

		try {
			const result = await db.query(`SELECT id, emotion_id as "emotionId", content, created_date as "createdDate" FROM diary_list WHERE id = ${id}`);
			res.json(result.rows);
		} catch (err) {
			console.error(err);
			res.status(500).send('Internal Server Error');
		}
	}).delete(async (req, res) => {
		const id = req.params.id;
		console.log(id);

		try {
			const result = await db.query(`DELETE FROM diary_list WHERE id = ${id}`);
			res.json(result.rows);
		} catch (err) {
			console.error(err);
			res.status(500).send('Internal Server Error');
		}
	});

router.get('/diary', function(req, res) {
	res.send('diary');
});

module.exports = router;
