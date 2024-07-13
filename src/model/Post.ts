// import { Tables } from "@/utils/database.types";
// import { PostImage } from "./PostImage";
// import { User } from "./User";

import { Tables } from "@/utils/database.types";

// export interface Post {
//   postId: number;
//   User: User;
//   content: string;
//   createdAt: Date;
//   Images: PostImage[];
// }

export interface Post extends Tables<"posts"> {
  profiles: Tables<"profiles">;
  postImages: Tables<"postImages">[];
}
