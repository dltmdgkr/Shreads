"use client";

type Props = {
  handleNextImage: () => void;
};

export default function PhotoModalNextButton({ handleNextImage }: Props) {
  return (
    <button
      className="w-34 h-34 border-none rounded-full bg-gray-600 bg-opacity-75 absolute right-20 flex items-center justify-center cursor-pointer"
      onClick={handleNextImage}
    >
      <svg
        width={36}
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="transform rotate-180"
      >
        <g>
          <path d="M7.414 11l5.043-5.04-1.414-1.42L3.586 11l7.457 7.46 1.414-1.42L7.414 13H21v-2H7.414z"></path>
        </g>
      </svg>
    </button>
  );
}
