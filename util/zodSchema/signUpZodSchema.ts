// schemas.js
import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Your name must be 3 characters long" })
    .max(30, { message: "Your name can't be more than 30 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/\d/, "Password must contain at least one number"),
});
