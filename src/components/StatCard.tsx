type Props = {
  label: string;
  value: string | number;
};

export default function StatCard({ label, value }: Props) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-zinc-100 px-4 py-3">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-zinc-500">{label}</span>
    </div>
  );
}
