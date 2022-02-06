import { useEffect, useState } from "react";
import { Card, CardContent, CardMedia } from "../components";
import { capitalize, zero_pad } from "../utilities";

export default function Home() {
  const [limit, setLimit] = useState(12);
  const [maxPage, setMaxPage] = useState(0);
  const [page, setPage] = useState(1);
  const [pokemons, setPokemons] = useState([]);

  const fetchData = () => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
        (page - 1) * limit
      }`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMaxPage(data.count);
        setPokemons(data.results);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='min-h-screen min-w-screen bg-gray-100'>
      <div className='container mx-auto p-5 grid grid-cols-4 gap-4'>
        {pokemons?.map((p, i) => {
          const id = (page - 1) * limit + i + 1;
          console.log(id);
          console.log(zero_pad(id));
          return (
            <Card key={i}>
              <CardMedia
                className='w-full h-auto object-cover max-w-img'
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              />
              <CardContent>
                <div className='text-md text-gray-400'>
                  <i>#{zero_pad(id ?? "", 4)}</i>
                </div>
                <div className='mt-2 text-3xl font-handwritten'>
                  {capitalize(p?.name)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
