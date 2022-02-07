import {
  Alert,
  Backdrop,
  CircularProgress,
  LinearProgress,
  Snackbar,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Chip, Footer, Header } from "../../components";
import { capitalize, zero_pad } from "../../utilities";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import HeartIcon from "../../components/Icons/Heart";

export default function PokemonDetail() {
  const router = useRouter();
  const { key } = router.query;
  const vertical = "top";
  const horizontal = "right";
  const [backdropOpen, setBackdropOpen] = useState(true);
  const [favourites, setFavourites] = useState([]);
  const [snackbarOptions, setSnackbarOptions] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [pokemon, setPokemon] = useState(null);

  const handleBackdropClose = () => setBackdropOpen(false);
  const handleSnackbarClose = () =>
    setSnackbarOptions({
      open: false,
    });

  const fetchData = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${key}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        setBackdropOpen(false);
      });
  };
  const fetchFavourites = () => {
    if (localStorage.getItem("favourites") === null) {
      localStorage.setItem("favourites", JSON.stringify([]));
    }
    const json = JSON.parse(localStorage.getItem("favourites"));
    if (json.length > 0) setFavourites(json);
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

  useEffect(() => {
    if (favourites.length === 0) fetchFavourites();
    if (key) fetchData();
  }, [favourites, key]);
  return (
    <div className='min-h-screen min-w-screen bg-gray-100'>
      <Header />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpen}
        onClick={handleBackdropClose}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Snackbar
        open={snackbarOptions.open}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}>
        <Alert severity={snackbarOptions.severity}>
          {snackbarOptions.message}
        </Alert>
      </Snackbar>
      <div className='container mx-auto flex flex-col justify-center items-center'>
        <div className='w-4/5 bg-white p-5'>
          <div className='flex justify-around items-center'>
            <img
              className='max-w-img-lg w-1/2'
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${zero_pad(
                pokemon?.id,
                3
              )}.png`}
              alt=''
              onError={(e) =>
                (e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png`)
              }
            />
            <div className='max-w-img-lg w-1/2'>
              <div className='text-md text-gray-500'>
                <i>#{zero_pad(pokemon?.id, 4)}</i>
              </div>
              <div className='mt-3 text-5xl text-black font-handwritten'>
                {capitalize(pokemon?.name)}
              </div>
              <div className='mt-5 w-full flex justify-start items-center'>
                {pokemon?.types.map((t, i) => {
                  return (
                    <Chip className='mr-3' type={t.type.name} key={i}>
                      {capitalize(t.type.name)}
                    </Chip>
                  );
                })}
              </div>
              <div className='mt-5'>
                <HeartIcon
                  solid={favourites.includes(pokemon?.id)}
                  size={7}
                  customClickEvent={() =>
                    handleFavourites(pokemon?.id, pokemon?.name)
                  }
                />
              </div>
            </div>
          </div>

          <div className='flex justify-around items-start'>
            <TableContainer className='h-96 w-1/2 mr-2' component={Paper}>
              <Table sx={{ minWidth: "400px", width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "150px" }}>Attribute</TableCell>
                    <TableCell>Stats</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pokemon?.stats.map((stat) => (
                    <TableRow
                      key={stat.stat.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}>
                      <TableCell component='th' scope='row'>
                        {stat.stat.name}
                      </TableCell>
                      <TableCell>
                        <LinearProgress
                          variant='determinate'
                          value={stat.base_stat}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className='w-1/2 h-96 ml-2 p-5 rounded-md flex flex-col justify-start align-start bg-blue-soft text-white'>
              <div>Abilities</div>
              <div>
                {pokemon?.abilities.map((a, i) => {
                  return (
                    <div className='mt-2' key={i}>
                      - {capitalize(a.ability.name)}
                    </div>
                  );
                })}
              </div>
              <div className='mt-5'>
                <div>Sprite</div>
                <img
                  className=''
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`}
                  alt=''
                  onError={(e) =>
                    (e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png`)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
