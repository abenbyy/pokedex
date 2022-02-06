export default function Card(props) {
  const { className, children } = props;
  return (
    <div
      className={`bg-white m-2 p-2 border-2 h-96 rounded-md shadow-lg cursor-pointer flex flex-col justify-center items-center transition ease-in-out hover:scale-125 ${className}`}>
      {children}
    </div>
  );
}
