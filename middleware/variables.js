export default (req, res, next) => {
    res.locals.isAuth = req.session.isAuthenticated

    next()
}