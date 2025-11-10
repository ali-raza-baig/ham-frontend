type Props = { title: string; value?: |number; unit?: string };

export default function PowerCard({ title, value, unit }: Props) {
  const formatted = value !== undefined ? value.toFixed(2) : "--";
  return (
    <div className="p-4 rounded-xl border bg-muted/10 hover:bg-muted/20 transition">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-2xl font-semibold mt-1">{formatted} {unit}</div>
    </div>
  );
}
