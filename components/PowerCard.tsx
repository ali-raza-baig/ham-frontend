import React from 'react';

type Props = {
  title: string;
  value: number | null | undefined;
  unit?: string;
  color?: string;
};

export default function PowerCard({ title, value, unit, color }: Props) {
  return (
    <div className="p-4 rounded-2xl shadow-sm bg-white/5">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="mt-2 text-2xl font-semibold">
        {value !== null && value !== undefined ? value.toFixed(2) : '--'} {unit}
      </div>
    </div>
  );
}
