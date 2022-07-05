const dotenv = require('dotenv');
dotenv.config({
    path: './config.env' // Must be before requiring 'app' file in here because we are using environment variables in 'app'.
});
const app = require('./app');



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});