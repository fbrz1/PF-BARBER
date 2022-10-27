import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsDetail } from "../../redux/actions";

function ScoreProduct() {
  const { id } = useParams();
  const [productos, setProductos] = useState({});
  const product = useSelector((state) => state.detail);
  useEffect(() => {
    if (id) getProductsDetail(id);
  }, [id, setProductos]);
  if (!productos) return null;
  return (
    <div>
      <h2>NAME</h2>
      <h3>{product.name}</h3>
      <h2>SCORE</h2>
      <h3>{product.score}</h3>
    </div>
  );
}
export default ScoreProduct;
