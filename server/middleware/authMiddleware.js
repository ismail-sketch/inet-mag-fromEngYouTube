import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ', )[1]
        if(!token) {
            return res.json({message: 'Пользователь не авторизован'})
        }
        const decodedData = jwt.verify(token, 'Secret Key')
        req.user = decodedData
        next()
    } catch (err) {
        console.log(err);
        return res.json({message: 'Пользователь не авторизован'})
    }
}