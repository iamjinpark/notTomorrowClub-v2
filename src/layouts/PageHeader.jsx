export default function PageHeader({ title, subtitle, children }) {
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
