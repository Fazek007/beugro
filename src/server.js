const app = require('./app')
const PORT = 3000;

var server = app.listen(PORT, function () {
    console.log("Server running on http://localhost:3000");
});