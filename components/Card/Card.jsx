export default function Card(props) {
  const { className, children } = props;

  return (
    <div
      className={`bg-white m-2 p-2 border-2 sm:h-60 lg:h-96 rounded-md shadow-lg flex flex-col justify-center items-center transition ease-in-out hover:scale-125 hover:z-10 ${className}`}>
      {children}
    </div>
  );
}
