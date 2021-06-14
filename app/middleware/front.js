module.exports = function (model) {
    var module = {};

    module.sessionChecker = async (req, res, next) => {
        if (req.session.user) {
            next();
        }
        else if (req.session.user == undefined) {
            res.redirect('/login');
        }
    }

    module.sessionCheckerAuth = async (req, res, next) => {
        if (req.session.user == undefined) {
            next();
        }
        else {
            res.redirect('/');
        }
    }

    return module;
};
