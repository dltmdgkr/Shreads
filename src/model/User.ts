import { Tables } from "@/utils/database.types";

export interface User extends Tables<"profiles"> {
  id: string;
  avatar_url: string;
  email: string;
  user_name: string;
}
