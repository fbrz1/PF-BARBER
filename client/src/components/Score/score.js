import React from "react";
import { getProductsDetail, updateRating } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from "@material-ui/lab";
/* import { Button } from "reactstrap";
import Container from "@material-ui/core/Container";
import { Box, Paper } from "@material-ui/core";
import { Remove, Add, Clear } from "@material-ui/icons"; */

const Score = () => {
  const dispatch = useDispatch();
  //const [score, setScore] = useState();

  const product = useSelector((state) => state.detail);
  const userId = useSelector((state) => state.user.id);
  const setScore = (newscore) => {
    dispatch(
      updateRating({
        productId: product.id,
        userId, // Hay que cambiar esto.
        score: newscore,
      })
    );
    dispatch(getProductsDetail(product.id));
  };

  return (
    <Rating
      value={product.score}
      onChange={(event, newValue) => {
        setScore(newValue);
      }}
    />
  );
};
export default Score;
