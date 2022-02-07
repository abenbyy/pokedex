export default function CardContent(props) {
  const { className, children } = props;

  return (
    <div
      className={`p-2 w-full h-full flex flex-col lg:flex-row justify-between ${className}`}>
      {children}
    </div>
  );
}
