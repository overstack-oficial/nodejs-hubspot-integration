module.exports = async(req, res, next) => {
    console.log("Acesssou o midlewares");
    next();
}