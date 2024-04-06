"use client";

export default function LogoutButton() {
  const me = {
    id: "lee",
    name: "dltmdgkr",
    image: "/noneProfile.jpg",
  };

  const onLogout = () => {};

  return (
    <button className="flex" onClick={onLogout}>
      <div className="mr-3">
        <img
          src={me.image}
          alt="profile_image"
          style={{ width: "40px", borderRadius: "50%" }}
        />
      </div>
      <div>
        <div className="font-bold">{me.name}</div>
        <div className="text-sm text-left leading-3">@{me.id}</div>
      </div>
    </button>
  );
}
