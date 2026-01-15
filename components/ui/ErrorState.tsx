type Props = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorState({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-center">
      <p className="text-red-600 font-semibold">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2  rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Try again
        </button>
      )}
    </div>
  );
}