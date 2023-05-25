import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserInput } from "src/models";
import { UserService } from "src/services";
import { isNumber, isString, toString } from "lodash";

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
        res.status(500).json({ error: "An error occurred" });
      });
  }

  async login(
    req: Request<{}, {}, { username: string; password: string | number }>,
    res: Response
  ) {}
}

export default AuthController;
