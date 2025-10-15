import jwt, { JwtPayload } from "jsonwebtoken";

const verifyToken = (authToken: string) => {
  if (!authToken) {
    throw new Error("Unauthorized Access");
  }

  const token = authToken.split(" ")[1];

  const decoded = jwt.verify(
    token,
    process.env.TOKEN_SECRET_KEY as string as string
  ) as JwtPayload;

  if (!decoded) {
    throw new Error("Unauthorized Access");
  }

  return decoded;
};

export default verifyToken;
