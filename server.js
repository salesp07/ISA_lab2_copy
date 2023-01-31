const express = require('express');
const axios = require('axios');
const app = express()
app.use(express.json()); // read JSON BODY
const cors = require('cors');
app.use(cors());
app.use(express.urlencoded({ extended: true })); // read URL encoded body
app.use(express.static(__dirname + '/public'));


app.post('/chatbot', (req, res) => {
	const message = req.body.message;
	const number = message.match(/\d+/);
	if (number) {
		axios.get(`http://numbersapi.com/${number}?type=trivia`).then(response => {
			res.json({
				text: response.data
			});
		}).catch(error => {
			res.json({
				text: "Sorry, I couldn't find any information about that number."
			});
		});
	} else {
		res.json({
			text: "I'm sorry, I didn't understand your question. Please provide a number for me to give you information about."
		});
	}
});


const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
