import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="flex flex-row items-start justify-between">
      <div>
        <h1 className="en-title-xl leading-[2.25rem]">{title}</h1>
        {subtitle && (
          <p className="ko-headline-lg text-gray3 mt-[0.563rem]">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}
