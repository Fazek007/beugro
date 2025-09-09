require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const app = require('./app')
const PORT = process.env.PORT || 3000;

var server = app.listen(PORT, function () {
    console.log("Server running on http://localhost:3000");
});