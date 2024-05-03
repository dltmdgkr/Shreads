import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { ReactNode } from "react";
import LogoutButton from "./_component/LogoutButton";
import Link from "next/link";
import RQProvider from "./_component/RQProvider";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/utils/database.types";
// import useSupabaseServer from "@/utils/supabase/server";

export default async function AfterLoginLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const cookieStore = cookies();
  // const supabase = useSupabaseServer(cookieStore);
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
  console.log("supabase", supabase);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const me = user!.user_metadata;
  console.log("me", me);
  return (
    <RQProvider>
      <Container className="relative" fixed>
        <Grid container>
          <Grid item xs={3}>
            <Paper
              style={{
                width: 250,
                height: "100vh",
                position: "fixed",
              }}
            >
              <MenuList>
                <Link href={"/"}>
                  <MenuItem className="pb-2">
                    <ListItemIcon>
                      <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>홈</ListItemText>
                  </MenuItem>
                </Link>
                <Link href={"/explore"}>
                  <MenuItem className="py-2">
                    <ListItemIcon>
                      <SearchIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>탐색하기</ListItemText>
                  </MenuItem>
                </Link>
                <Link href={"/messages"}>
                  <MenuItem className="py-2">
                    <ListItemIcon>
                      <MailOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>쪽지</ListItemText>
                  </MenuItem>
                </Link>
                <Link href={"/dltmdgkr"}>
                  <MenuItem className="py-2 pb-3">
                    <ListItemIcon>
                      <PermIdentityIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>프로필</ListItemText>
                  </MenuItem>
                </Link>
                <Link href={"/create-post"}>
                  <MenuItem className="pb-3">
                    <ListItemIcon>
                      <PostAddIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>게시하기</ListItemText>
                  </MenuItem>
                </Link>
                <Divider />
              </MenuList>
              <MenuItem className="py-2">
                <LogoutButton me={me} />
              </MenuItem>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            {children}
          </Grid>
        </Grid>
        {modal}
      </Container>
    </RQProvider>
  );
}
