"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// 独自のProgressコンポーネントを実装
// Radix UIのProgressコンポーネントが構文エラーを起こしているため
const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: number;
    max?: number;
    getValueLabel?: (value: number, max: number) => string;
  }
>(({ className, value = 0, max = 100, getValueLabel, ...props }, ref) => {
  // 値のバリデーション
  const validMax = max > 0 ? max : 100;
  const validValue =
    value !== null && value >= 0 && value <= validMax ? value : 0;

  // 進捗率の計算
  const percentage = (validValue / validMax) * 100;

  // アクセシビリティのためのラベル
  const valueLabel = getValueLabel
    ? getValueLabel(validValue, validMax)
    : `${Math.round(percentage)}%`;

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={validMax}
      aria-valuenow={validValue}
      aria-valuetext={valueLabel}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
});

Progress.displayName = "Progress";

export { Progress };
