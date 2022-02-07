export default function Card(props) {
  const { className, children, href } = props;
  const handleHref = () => {
    window.location = href;
  };
  return (
    <div
      style={{
        position: "relative",
      }}
      onClick={handleHref}
      className={`bg-white m-2 p-2 border-2 h-96 rounded-md shadow-lg cursor-pointer flex flex-col justify-center items-center transition ease-in-out hover:scale-125 hover:z-10 ${className}`}>
      {children}
    </div>
  );
}
