require('dotenv').config();
const app = require('./src/app.js');
const connectToDB = require('./src/db/db.js');

connectToDB();
PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server is running on port',PORT);
})