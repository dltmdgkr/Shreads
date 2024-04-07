import { faker } from "@faker-js/faker";
import { HttpResponse, http } from "msw";

const User = [
  { id: "elonmusk", name: "Elon Musk", image: "/noneProfile.jpg" },
  { id: "elonmusk", name: "Elon Musk", image: "/noneProfile.jpg" },
  { id: "hihi", name: "leehai", image: faker.image.avatar() },
];

export const handlers = [
  http.post("/api/login", () => {
    console.log("로그인");
    return HttpResponse.json(
      {
        userId: 1,
        name: "dltmdgkr",
        id: "lee",
        image: "/noneProfile.jpg",
      },
      {
        headers: {
          "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
        },
      }
    );
  }),
  http.post("/api/logout", () => {
    console.log("로그아웃");
    return HttpResponse.json(null, {
      headers: {
        "Set-Cookie": "connect.sid=;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
  http.post("/api/signup", () => {
    console.log("회원가입");
    // return HttpResponse.text(JSON.stringify("user_exists"), {
    //   status: 403,
    // });
    return HttpResponse.text(JSON.stringify("ok"), {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/;Max-Age=0",
      },
    });
  }),
  http.get("/api/postRecommends", async ({ request }) => {
    return HttpResponse.json([
      {
        postId: 1,
        User: User[0],
        content: `${1} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [{ imageId: 1, link: faker.image.urlLoremFlickr() }],
        createdAt: new Date(),
      },
      {
        postId: 2,
        User: User[1],
        content: `${2} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [
          { imageId: 1, link: faker.image.urlLoremFlickr() },
          { imageId: 2, link: faker.image.urlLoremFlickr() },
        ],
        createdAt: new Date(),
      },
      {
        postId: 3,
        User: User[2],
        content: `${3} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [],
        createdAt: new Date(),
      },
      {
        postId: 4,
        User: User[2],
        content: `${3} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [],
        createdAt: new Date(),
      },
    ]);
  }),
];
