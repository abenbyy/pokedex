import { Alert, capitalize, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Card, CardContent, CardMedia } from "../components";
import HeartIcon from "../components/Icons/Heart";
import { zero_pad } from "../utilities";

export default function Home() {
  const [limit, setLimit] = useState(12);
  const vertical = "top";
  const horizontal = "right";
  const [maxPage, setMaxPage] = useState(0);
  const [page, setPage] = useState(1);
  const [pokemons, setPokemons] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [snackbarOptions, setSnackbarOptions] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    setSnackbarOptions({
      open: false,
    });
  };

  const handleFavourites = (id, name) => {
    let newVal = [];
    let action = "";
    if (favourites.includes(id)) {
      let arr = favourites;
      arr.splice(arr.indexOf(id), 1);
      newVal = arr;
      action = "removed from";
    } else {
      newVal = [...favourites, id];
      action = "added to";
    }
    setFavourites(newVal);
    localStorage.setItem("favourites", JSON.stringify(newVal));
    setSnackbarOptions({
      open: true,
      message: `${capitalize(name)} has been ${action} your favourites`,
    });
  };

  const fetchFavourites = () => {
    if (localStorage.getItem("favourites") === null) {
      localStorage.setItem("favourites", JSON.stringify([]));
    }
    const json = JSON.parse(localStorage.getItem("favourites"));
    if (json.length > 0) setFavourites(json);
  };

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
    if (favourites.length === 0) fetchFavourites();
    fetchData();
  }, [favourites]);

  return (
    <div className='min-h-screen min-w-screen bg-gray-100'>
      <Snackbar
        open={snackbarOptions.open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}>
        <Alert severity={snackbarOptions.severity}>
          {snackbarOptions.message}
        </Alert>
      </Snackbar>
      <div className='container mx-auto p-5 grid grid-cols-4 gap-4'>
        {pokemons?.map((p, i) => {
          const id = (page - 1) * limit + i + 1;
          return (
            <Card key={i}>
              <CardMedia
                className='w-full h-auto object-cover max-w-img'
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              />
              <CardContent>
                <div>
                  <div className='text-md text-gray-400'>
                    <i>#{zero_pad(id ?? "", 4)}</i>
                  </div>
                  <div className='mt-2 text-3xl font-handwritten'>
                    {capitalize(p?.name)}
                  </div>
                </div>
                <div>
                  <HeartIcon
                    solid={favourites.includes(id)}
                    customClickEvent={() => handleFavourites(id, p?.name)}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
