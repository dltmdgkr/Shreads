import { Tables } from "@/utils/database.types";
export interface Post extends Tables<"posts"> {
  profiles: Tables<"profiles">;
  postImages: Tables<"postImages">[];
  comments: Tables<"comments">[];
  like_count: number;
  repost_count: number;
}
