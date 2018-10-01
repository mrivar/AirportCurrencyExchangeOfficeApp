const express = require('express');
const path = require('path');
const os = require('os');

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});
const PORT = (process.env.PORT || 8080);
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
