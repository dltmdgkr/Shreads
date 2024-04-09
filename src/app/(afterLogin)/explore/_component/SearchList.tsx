export default function SearchList() {
  const userData = {
    id: "lee",
    name: "dltmdgkr",
    image: "/noneProfile.jpg",
    follower: 100,
  };
  return (
    <div>
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center">
          <img
            src={userData.image}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-4"
          />
          <div>
            <h2 className="text-md font-semibold">{userData.name}</h2>
            <p className="text-sm text-gray-600">@{userData.id}</p>
          </div>
        </div>
        <button className="border border-gray-300 text-sm py-1.5 px-8 rounded-xl">
          팔로우
        </button>
      </div>
      <div className="ml-[70px] pb-3 border-b border-gray-200">
        <p>팔로워 {userData.follower}명</p>
      </div>
    </div>
  );
}
