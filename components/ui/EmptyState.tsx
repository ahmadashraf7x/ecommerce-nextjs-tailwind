type Props = {
  title: string;
  description?: string;
};

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center gap-2 text-gray-500">
      <p className="text-lg font-semibold">{title}</p>
      {description && <p className="text-sm">{description}</p>}
    </div>
  );
}