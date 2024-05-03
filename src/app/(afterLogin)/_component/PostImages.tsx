import Link from "next/link";
import style from "@/app/(afterLogin)/_component/post.module.css";
import cx from "classnames";
import { Tables } from "@/utils/database.types";

export default function PostImages({
  post,
}: Readonly<{ post: Tables<"posts"> }>) {
  if (!post.images) return null;
  if (!post.images.length) return null;
  if (post.images.length === 1) {
    return (
      <Link
        href={`/photo`}
        className={cx(style.postImageSection, style.oneImage)}
        style={{
          backgroundImage: `url(${post.images[0]?.link})`,
          backgroundSize: "contain",
        }}
      >
        <img src={post.images[0]} alt="" /> {/* TODO: images[0].link로 변경 */}
      </Link>
    );
  }
  if (post.images.length === 2) {
    return (
      <div className={cx(style.postImageSection, style.twoImage)}>
        <Link
          href={`/photo`}
          style={{
            backgroundImage: `url(${post.images[0]?.link})`,
            backgroundSize: "cover",
          }}
        ></Link>
        <Link
          href={`/photo`}
          style={{
            backgroundImage: `url(${post.images[1]?.link})`,
            backgroundSize: "cover",
          }}
        ></Link>
      </div>
    );
  }
  if (post.images.length === 3) {
    return (
      <div className={cx(style.postImageSection, style.threeImage)}>
        <Link
          href={`/photo`}
          style={{
            backgroundImage: `url(${post.images[0]?.link})`,
            backgroundSize: "cover",
          }}
        ></Link>
        <div>
          <Link
            href={`/photo`}
            style={{
              backgroundImage: `url(${post.images[1]?.link})`,
              backgroundSize: "cover",
            }}
          ></Link>
          <Link
            href={`/photo`}
            style={{
              backgroundImage: `url(${post.images[2]?.link})`,
              backgroundSize: "cover",
            }}
          ></Link>
        </div>
      </div>
    );
  }
  if (post.images.length === 4) {
    return (
      <div className={cx(style.postImageSection, style.fourImage)}>
        <Link
          href={`/photo`}
          style={{
            backgroundImage: `url(${post.images[0]?.link})`,
            backgroundSize: "cover",
          }}
        ></Link>
        <Link
          href={`/photo`}
          style={{
            backgroundImage: `url(${post.images[1]?.link})`,
            backgroundSize: "cover",
          }}
        ></Link>
        <Link
          href={`/photo`}
          style={{
            backgroundImage: `url(${post.images[2]?.link})`,
            backgroundSize: "cover",
          }}
        ></Link>
        <Link
          href={`/photo`}
          style={{
            backgroundImage: `url(${post.images[3]?.link})`,
            backgroundSize: "cover",
          }}
        ></Link>
      </div>
    );
  }
  return null;
}
