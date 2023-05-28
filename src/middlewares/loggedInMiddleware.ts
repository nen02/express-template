import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "src/config";
import { AuthRequest } from "src/types";

interface UserDecodedToken {
  id: number;
  uuid: string;
  username: string;
  firstName: string;
  lastName: string;
}

class LoggedInMiddleware {
  authenticate(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(authHeader, SECRET_KEY, (error, decodedToken) => {
      if (error) return res.status(401).json({ message: "Unauthorized" });

      req.user = decodedToken as UserDecodedToken;
      next();
    });
  }
}

export default LoggedInMiddleware;
