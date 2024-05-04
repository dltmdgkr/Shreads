import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/utils/database.types";
import EditProfileForm from "./editProfile-form";

export default async function EditProfile() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <EditProfileForm user={user} />;
}
