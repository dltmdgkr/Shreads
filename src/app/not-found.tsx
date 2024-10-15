import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-white">
      <h1 className="text-2xl font-bold mb-2">
        죄송합니다. 페이지를 이용할 수 없습니다
      </h1>
      <p className="text-base mb-4">
        클릭하신 링크가 잘못되었거나 페이지가 삭제되었을 수 있습니다.
      </p>
      <Link
        href="/"
        className="inline-block px-4 py-2 bg-black text-white rounded"
      >
        돌아가기
      </Link>
    </div>
  );
}
