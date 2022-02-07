import Link from "next/link";

export default function Header() {
  return (
    <div className='mb-5 bg-blue-soft text-white text-xl h-20 w-full flex justify-center items-center'>
      <Link href='/'>POKEDEX</Link>
    </div>
  );
}
