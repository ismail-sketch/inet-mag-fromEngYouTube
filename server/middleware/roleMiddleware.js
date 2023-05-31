import jwt from 'jsonwebtoken'

export const roleMiddleware = (roles) => {

    return (req, res, next) => {
        if(req.method === 'OPTIONS') {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ', )[1]
            console.log(token);
            if(!token) {
                return res.json({message: 'Пользователь не авторизован', code: 'bad'})
            }

            const {roles: userRoles} = jwt.verify(token, 'Secret Key')
            let hasRole = false

            userRoles.forEach(role => {
                if(roles.includes(role)) {
                    hasRole = true
                }
            })
            if(!hasRole) {
                return res.json({message: 'У вас нет доступа', code: 'bad'})
            }

            next()
        } catch (err) {
            console.log(err);
            return res.json({message: 'Пользователь не авторизован', code: 'bad'})
        }
    }
}