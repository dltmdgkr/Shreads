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

export default function AfterLoginLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <Container fixed>
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
                <MenuItem className="pt-2 pb-3">
                  <ListItemIcon>
                    <PermIdentityIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>프로필</ListItemText>
                </MenuItem>
              </Link>
              <Divider />
              <Link href={"/create-post"}>
                <MenuItem className="pt-4 pb-3">
                  <ListItemIcon>
                    <PostAddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>게시하기</ListItemText>
                </MenuItem>
              </Link>
            </MenuList>
            <MenuItem className="py-2">
              <LogoutButton />
            </MenuItem>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          {children}
        </Grid>
      </Grid>
      {modal}
    </Container>
  );
}
