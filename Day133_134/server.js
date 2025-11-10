require('dotenv').config();
const app = require('./src/app.js');
const connectToDB = require('./src/db/db.js');

connectToDB();
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} running on.`);
})