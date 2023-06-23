exports.index = (req, res) => {
    if (1 == 2) {
        res.render('index/login')
    } else {
        res.render('index/dashboard')
    }
};
