import { Container } from "@mui/material";
import { ReactNode } from "react";
import RQProvider from "./_component/RQProvider";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import NavMenu from "./_component/NavMenu";
import PresenceTracker from "./_component/PresenceTracker";

export default async function AfterLoginLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <RQProvider>
      <Container fixed>
        <div className="relative flex min-h-screen">
          <NavMenu session={session} />
          <div className="flex-1 lg:ml-64 sm:p-4 mt-16 lg:mt-0">
            <PresenceTracker loggedInUser={session?.user} />
            {children}
          </div>
          {modal}
        </div>
      </Container>
    </RQProvider>
  );
}
