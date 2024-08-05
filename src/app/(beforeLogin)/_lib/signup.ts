import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

const signUpHandler = async (prevState: any, formData: FormData) => {
  // const router = useRouter()
  const supabase = createClientComponentClient();

  if (!formData?.get("email") || !(formData.get("email") as string)?.trim()) {
    return { message: "no_email" };
  }

  if (
    !formData.get("password") ||
    !(formData.get("password") as string)?.trim()
  ) {
    return { message: "no_password" };
  }

  let shouldRedirect = false;
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_SHREADS_URL
          ? `${process.env.NEXT_PUBLIC_SHREADS_URL}/auth/callback`
          : "http://localhost:3000/auth/callback",
      },
    });
    shouldRedirect = true;
  } catch (err) {
    console.error(err);
    return;
  }
  if (shouldRedirect) {
    redirect("/login");
  }
  return { message: null };
};

export default signUpHandler;
