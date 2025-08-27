export default function FloatingElements() {
  return (
    <>
      <div className="floating-shape w-32 h-32 top-20 left-10 animate-float opacity-60"></div>
      <div className="floating-shape w-24 h-24 top-40 right-20 animate-float-delayed opacity-40"></div>
      <div className="floating-shape w-40 h-40 bottom-20 left-1/4 animate-float-slow opacity-50"></div>
      <div className="floating-shape w-28 h-28 top-1/3 right-1/3 animate-float opacity-30"></div>
    </>
  );
}
