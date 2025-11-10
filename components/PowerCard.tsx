type Props = {
  title: string;
  value?: number | null;
  unit?: string;
};

export default function PowerCard({ title, value, unit }: Props) {
  // const formatted =
  //   typeof value === "number" && !isNaN(value)
  //     ? value
  //     : "--";

  return (
    <div className="p-4 rounded-xl border bg-muted/10 hover:bg-muted/20 transition">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-2xl font-semibold">
        {value} {unit}
      </div>
    </div>
  );
}
