export default function CardMedia(props) {
  const { className, src, style } = props;

  return (
    <img
      className={` ${className}`}
      style={style}
      src={src}
      alt='pokemon image'
      onError={(e) =>
        (e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png`)
      }
    />
  );
}
