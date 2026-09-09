import jwt from "jsonwebtoken"

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT as string, {
    expiresIn: '30d'
  });
}