import { Tables } from "@/utils/database.types";

export interface Comment extends Tables<"comments"> {
  profiles: Tables<"profiles">;
  commentImages: Tables<"commentImages">[];
}
