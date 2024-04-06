import Post from "../_component/Post";
import PostForm from "./_component/PostForm";

export default function Home() {
  return (
    <main className="h-screen overflow-y-auto">
      <PostForm />
      <Post />
      <Post />
      <Post />
    </main>
  );
}
