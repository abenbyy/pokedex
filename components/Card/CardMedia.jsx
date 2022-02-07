export default function CardMedia(props) {
  const { className, src, style, href } = props;
  const handleHref = () => {
    window.location = href;
  };
  return (
    <img
      onClick={handleHref}
      className={`cursor-pointer ${className}`}
      style={style}
      src={src}
      alt='pokemon image'
      onError={(e) =>
        (e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png`)
      }
    />
  );
}
