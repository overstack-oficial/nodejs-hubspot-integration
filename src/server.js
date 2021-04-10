const app = require('./app');

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`App listenner in port ${PORT}`)
})