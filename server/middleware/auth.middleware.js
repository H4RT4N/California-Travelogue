const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        let decodedData;
        if(token) {
            decodedData = jwt.verify(token, 'temp');
            req.userId = decodedData?.id;
        }
        next();
    } catch (err) {console.log(err)};
}

module.exports = auth;