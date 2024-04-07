import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "./PostArticle";
import { faker } from "@faker-js/faker";
import PostImages from "./PostImages";
import { Post } from "@/model/Post";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Post({
  noImage,
  post,
}: {
  noImage?: boolean;
  post: Post;
}) {
  // const target = {
  //   postId: 1,
  //   User: {
  //     id: "lee",
  //     name: "dltdmgkr",
  //     image: "/noneProfile.jpg",
  //   },
  //   content: "슈레드 클론코딩 너무 즐겁습니다ㅠㅠ",
  //   createdAt: new Date(),
  //   Images: [] as any[],
  // };

  const target = post;

  if (Math.random() > 0.5 && !noImage) {
    target.Images.push({ imageId: 1, link: faker.image.urlLoremFlickr() });
  }

  return (
    <PostArticle post={target}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${target.User.id}`} className={style.postUserImage}>
            <img src={target.User.image} alt={target.User.name} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={style.postUserName}>{target.User.name}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{target.content}</div>
          <div className={style.postImageSection}>
            <PostImages post={target} />
          </div>
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
