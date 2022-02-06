export default function CardContent(props) {
  const { className, children } = props;

  return (
    <div className={`p-2 w-full h-full flex flex-col ${className}`}>
      {children}
    </div>
  );
}
