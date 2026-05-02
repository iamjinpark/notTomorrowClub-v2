function TypingIndicator() {
  return (
    <div
      className="
        inline-flex items-center gap-1
        px-3 py-2
        rounded-xl bg-gray5
      "
      style={{
        animation: "typing 0.3s ease-in-out forwards",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-charcoal/60"
        style={{
          animation: "pulse 1.4s ease-in-out infinite",
          animationDelay: "0s",
        }}
      />
      <span
        className="w-1.5 h-1.5 rounded-full bg-charcoal/60"
        style={{
          animation: "pulse 1.4s ease-in-out infinite",
          animationDelay: "0.2s",
        }}
      />
      <span
        className="w-1.5 h-1.5 rounded-full bg-charcoal/60"
        style={{
          animation: "pulse 1.4s ease-in-out infinite",
          animationDelay: "0.4s",
        }}
      />
    </div>
  );
}
export default TypingIndicator;
