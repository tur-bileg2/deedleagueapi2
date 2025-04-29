export type Message = {
  message?: string;
  error?: { message: string };
};

export function FormMessage({
  message,
}: {
  message: Message | null | undefined;
}) {
  if (!message?.error && !message?.message) {
    return null;
  }

  return (
    <div
      className={`p-4 rounded-md ${
        message.error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
      }`}
    >
      {message.error?.message || message.message}
    </div>
  );
}
