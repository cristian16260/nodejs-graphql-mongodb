import jwt from 'jsonwebtoken'

export const createjwt = (user) => {
    return jwt.sign({user},"secret",{expiresIn: "1d"})
}
