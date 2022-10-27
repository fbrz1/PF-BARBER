import React from "react";
import { getProductsDetail, updateProducts } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
const dispatch = useDispatch();

const Score = () => {
  //const [score, setScore] = useState();
  const product = useSelector((state) => state.detail);
  const setScore = (newscore) => {
    dispatch(
      updateProducts({
        ...product,
        score: newscore,
      })
    );
    dispatch(getProductsDetail(product.id));
  };
  //if(autentiquit) {
  return (
    <Container>
      <Paper>
        <Box>
          <Button
            onClick={() =>
              setScore(product.score === 0 ? 0 : product.score - 1)
            }
            variant="contained"
          >
            <Remove />
          </Button>
        </Box>
        <Box>
          <Button
            onClick={() =>
              setScore(product.score === 5 ? 5 : product.score + 1)
            }
            variant="contained"
          >
            <Add />
          </Button>
        </Box>
        <Paper square>{product.score}</Paper>
        <Box>
          <Button variant="contained">
            <Clear />
          </Button>
        </Box>
      </Paper>
    </Container>
  );
  // }
  //
  //return (
  //<Button>{alert(Registro de Logueo)}<Button>
  // )
};

export default Score;

//npm install react icon
