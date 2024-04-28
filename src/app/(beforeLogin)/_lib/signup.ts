"use server";

import { signIn } from "@/auth";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

const signUpHandler = async (prevState: any, formData: FormData) => {
  if (!formData?.get("email") || !(formData.get("email") as string)?.trim()) {
    return { message: "no_email" };
  }

  if (
    !formData.get("password") ||
    !(formData.get("password") as string)?.trim()
  ) {
    return { message: "no_password" };
  }

  // let shouldRedirect = false;
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    // shouldRedirect = true;
    // redirect("/login");
  } catch (err) {
    console.error(err);
    return;
  }
  // if (shouldRedirect) {
  // }
  return { message: null };
};

export default signUpHandler;
