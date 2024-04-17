import { User } from "@/model/User";

export default function SearchList({ user }: { user: User }) {
  return (
    <div>
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center">
          <img
            src={user.image}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <h2 className="text-md font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">@{user.id}</p>
          </div>
        </div>
        <button className="border border-gray-300 text-sm py-1.5 px-8 rounded-xl">
          팔로우
        </button>
      </div>
      <div className="ml-[70px] pb-3 border-b border-gray-200">
        <p>팔로워 {user.followers}명</p>
      </div>
    </div>
  );
}
