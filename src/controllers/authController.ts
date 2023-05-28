import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserInput } from "src/models";
import { UserService } from "src/services";
import { isString, toString } from "lodash";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "src/config";

class AuthController {
  private readonly userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request<{}, {}, UserInput>, res: Response) {
    const user = req.body;

    const errors = [];

    if (!user.username)
      errors.push({ field: "username", message: "This field is required" });
    if (!user.email)
      errors.push({ field: "email", message: "This field is required" });
    if (!user.firstName)
      errors.push({ field: "firstName", message: "This field is required" });
    if (!user.lastName)
      errors.push({ field: "lastName", message: "This field is required" });
    if (!user.password)
      errors.push({ field: "password", message: "This field is required" });

    if (errors.length > 0) return res.status(400).json({ errors });

    if (await this.userService.usernameExists(req.body.username))
      errors.push({ field: "username", message: "Username already exists" });

    if (await this.userService.emailExists(req.body.email))
      errors.push({ field: "email", message: "Email already exists" });

    if (errors.length > 0) return res.status(400).json({ errors });

    bcrypt
      .hash(
        isString(user.password) ? user.password : toString(user.password),
        10
      )
      .then(async (hash) => {
        const createdUser = await this.userService.createUser({
          ...user,
          password: hash,
        });

        if (!createdUser) return res.sendStatus(500);

        return res.json({ user: createdUser });
      })
      .catch(() => {
        return res.status(500).json({ message: "An error occurred" });
      });
  }

  async login(
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response
  ) {
    const { username, password } = req.body;

    if (!username || !password || !isString(password))
      return res.status(403).json({ message: "Invalid username or password" });

    const user = await this.userService.getUserByUsername(username, [
      "id",
      "password",
    ]);

    if (!user)
      return res.status(403).json({ message: "Invalid username or password" });

    bcrypt
      .compare(password, user.password)
      .then((passwordMatched) => {
        if (!passwordMatched)
          return res
            .status(403)
            .json({ message: "Invalid username or password" });

        const token = jwt.sign(
          {
            id: user.id,
            uuid: user.uuid,
            username,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          SECRET_KEY,
          { expiresIn: "1d" }
        );

        return res.json({
          user: {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          token,
        });
      })
      .catch(() => {
        return res.status(500).json({ message: "An error occurred" });
      });
  }
}

export default AuthController;
