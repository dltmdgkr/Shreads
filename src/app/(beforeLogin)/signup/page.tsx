import { auth } from "@/auth";
import Signup from "../_component/Signup";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return <Signup />;
}
