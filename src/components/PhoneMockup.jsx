export default function PhoneMockup({ screen, className = "" }) {
  return (
    <div className={`phone-mockup w-full max-w-[220px] mx-auto ${className}`} style={{ aspectRatio: "9/19" }}>
      <div className="absolute inset-0 pt-8 pb-4 px-3 flex flex-col overflow-hidden">
        {screen}
      </div>
    </div>
  );
}
