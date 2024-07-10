const express = require('express');
const app = express();
const port = 3000;

const userList = [
	{
		id: 'qndyqldy',
		name: 'ywyim',
		age: 32
	},
	{
		id: 'iboy1234',
		name: 'ywyim',
		age: 14
	},
	{
		id: 'gildong',
		name: '홍길동',
		age: 50
	}
]

app.get('/', (req, res) => {
	res.send('hello world');
})

app.get('/api/home', (req, res) => {
	setTimeout(() => {
		res.send('welcome my home');
	}, 2000);
})


app.get('/api/user/:id', (req, res) => {
	console.log(req.params);
	setTimeout(() => {
		res.send(
			userList.find(user => user.id === req.params.id)
		);
	}, 2000);
})



app.listen(port, () => {
	console.log(`example app listening on port ${port}`);
})