export default function CardMedia(props) {
  const { className, src, style } = props;

  return (
    <img
      className={` ${className}`}
      style={style}
      src={src}
      alt='pokemon image'
    />
  );
}
