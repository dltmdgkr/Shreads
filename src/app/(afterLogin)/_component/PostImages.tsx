import Link from "next/link";
import style from "@/app/(afterLogin)/_component/post.module.css";
import cx from "classnames";
import { Tables } from "@/utils/database.types";
import { useRouter, redirect } from "next/navigation";
import { Post } from "@/model/Post";

export default function PostImages({ post }: { post: Post }) {
  // if (!post.images) return null;
  // if (!post.images.length) return null;
  // if (post.images.length === 1) {
  //   return (
  //     <Link
  //       href={`/${post.profiles.user_name}/posts/${post.id}/photo`}
  //       className={cx(style.postImageSection, style.oneImage)}
  //       style={{
  //         backgroundImage: `url(${post.images[0]})`,
  //         backgroundSize: "contain",
  //       }}
  //     >
  //       <img src={post.images[0]} alt="" />
  //     </Link>
  //   );
  // }
  // if (post.images.length === 2) {
  //   return (
  //     <div className={cx(style.postImageSection, style.twoImage)}>
  //       <Link
  //         href={`/${post.profiles.user_name}/posts/${post.id}/photo`}
  //         style={{
  //           backgroundImage: `url(${post.images[0]})`,
  //           backgroundSize: "cover",
  //         }}
  //       ></Link>
  //       <Link
  //         href={`/${post.profiles.user_name}/posts/${post.id}/photo`}
  //         style={{
  //           backgroundImage: `url(${post.images[1]})`,
  //           backgroundSize: "cover",
  //         }}
  //       ></Link>
  //     </div>
  //   );
  // }
  // if (post.images.length === 3) {
  //   return (
  //     <div className={cx(style.postImageSection, style.threeImage)}>
  //       <Link
  //         href={`/${post.profiles.user_name}/posts/${post.id}/photo`}
  //         style={{
  //           backgroundImage: `url(${post.images[0]})`,
  //           backgroundSize: "cover",
  //         }}
  //       ></Link>
  //       <div>
  //         <Link
  //           href={`/${post.profiles.user_name}/posts/${post.id}/photo`}
  //           style={{
  //             backgroundImage: `url(${post.images[1]})`,
  //             backgroundSize: "cover",
  //           }}
  //         ></Link>
  //         <Link
  //           href={`/${post.profiles.user_name}/posts/${post.id}/photo`}
  //           style={{
  //             backgroundImage: `url(${post.images[2]})`,
  //             backgroundSize: "cover",
  //           }}
  //         ></Link>
  //       </div>
  //     </div>
  //   );
  // }
  // if (post.images.length === 4) {
  //   return (
  //     <div className={cx(style.postImageSection, style.fourImage)}>
  //       <Link
  //         href={`/${post.profiles.user_name}/posts/${post.id}/photo`}
  //         style={{
  //           backgroundImage: `url(${post.images[0]})`,
  //           backgroundSize: "cover",
  //         }}
  //       ></Link>
  //       <Link
  //         href={`/${post.profiles.user_name}/posts/${post.id}/photo`}
  //         style={{
  //           backgroundImage: `url(${post.images[1]})`,
  //           backgroundSize: "cover",
  //         }}
  //       ></Link>
  //       <Link
  //         href={`/${post.profiles.user_name}/posts/${post.id}/photo`}
  //         style={{
  //           backgroundImage: `url(${post.images[2]})`,
  //           backgroundSize: "cover",
  //         }}
  //       ></Link>
  //       <Link
  //         href={`/${post.profiles.user_name}/posts/${post.id}/photo`}
  //         style={{
  //           backgroundImage: `url(${post.images[3]})`,
  //           backgroundSize: "cover",
  //         }}
  //       ></Link>
  //     </div>
  //   );
  // }
  // return null;

  // const router = useRouter();

  // const handleImageClick = () => {
  //   router.push(`/${post.profiles.user_name}/posts/${post.id}/photo/${post.images}}`);
  // };
  return (
    <div className="flex overflow-scroll">
      {post.postImages?.map((image) => (
        <Link
          key={image.id}
          href={`/${post.profiles.user_name}/posts/${post.id}/photo/${image.id}`}
        >
          <img src={image.image_url!} alt="게시글 이미지" />
        </Link>
      ))}
    </div>
  );
}
