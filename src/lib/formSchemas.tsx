import { z } from "zod";

export const DataRequestFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  projectTitle: z.string().min(1, "Project title is required"),
  projectDescription: z.string().optional(),
  dataRequirements: z.string().optional(),
  timeRange: z.string().optional(),
  preferredFormat: z.string().optional(),
});

export type TDataRequestForm = z.infer<typeof DataRequestFormSchema>;
