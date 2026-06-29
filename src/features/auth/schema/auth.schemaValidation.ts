import { z } from "zod";

export const RegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  username: z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .max(16) // Regex 15 characters tak hai, toh max bhi 16 rakho
    .regex(/^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/, "Invalid username format"),

  // .email() use karna behtar hai
  email: z.string().email("Invalid email address"),

  role: z.enum(["applicant", "employee"], {
    error: "Choose role between Applicant & Employee",
  }),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
      "Password must include uppercase, lowercase, number and special character",
    ),
});

export const RegistrationSchemaExtends = RegistrationSchema.extend({
  confirmpassword: z.string(),
}).refine((data) => data.password === data.confirmpassword, {
  // 👈 FIX: Password match logic
  message: "Passwords do not match", // 👈 FIX: 'error' ki jagah 'message' key hoti hai
  path: ["confirmpassword"],
});

// Types generate karna mast hai!
export type RegistrationSchemaExtendsTypes = z.infer<
  typeof RegistrationSchemaExtends
>;

export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginSchemaTypes = z.infer<typeof LoginSchema>;
