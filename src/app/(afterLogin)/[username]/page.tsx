import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
import UserProfileBottomNavigation from "./_component/UserProfileBottomNavigation";

export default function UserPage() {
  const user = {
    id: "lee",
    name: "dltmdgkr",
    followers: 100,
    following: 50,
  };
  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex mb-4">
        <div className="flex flex-col justify-center flex-1">
          <div className="text-xl font-bold text-left">{user.name}</div>
          <div className="text-lg text-left">@{user.id}</div>
        </div>
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src="/noneProfile.jpg"
          alt="Profile Image"
        />
      </div>
      <div className="flex flex-start mb-8">
        <div className="flex flex-1">
          <div className="text-gray-400">팔로워</div>
          <div className="text-gray-400 ml-1">{user.followers}명</div>
        </div>
        <Link href="https://github.com/dltmdgkr" target="_blank">
          <GitHubIcon />
        </Link>
      </div>
      <button className="w-full border border-gray-300 px-4 py-1 rounded-xl text-gray-700 hover:bg-gray-100">
        프로필 편집
      </button>
      <UserProfileBottomNavigation />
    </div>
  );
}
