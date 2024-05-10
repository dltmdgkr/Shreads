// import { auth } from "@/auth";
import Login from "../_component/Login";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  // const session = await auth();

  // if (session?.user) {
  //   redirect("/");
  // }

  return <Login />;
}
