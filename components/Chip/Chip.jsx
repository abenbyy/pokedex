export default function Chip(prop) {
  const { className, children, type } = prop;
  return (
    <div
      className={`p-2 w-20 rounded-xl text-center text-white ${type} ${className}`}>
      {children}
    </div>
  );
}
