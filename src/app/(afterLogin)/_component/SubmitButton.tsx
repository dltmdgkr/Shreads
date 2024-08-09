interface SubmitButtonProps {
  disabled: boolean;
}

export default function SubmitButton({ disabled }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className={`sm:px-6 px-4 py-2 font-semibold border rounded-xl ${
        disabled
          ? "text-gray-400 border-gray-200 cursor-not-allowed"
          : "text-black border-gray-400"
      }`}
      disabled={disabled}
    >
      게시
    </button>
  );
}
