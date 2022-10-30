import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

export default function Score() {
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  /*     const prods = useSelector((state) => state.products)

    const rat = prods.map(item  => item.product.score)

    for (let star in stars){
        const starPercentage = (stars[star]/stars.length)*100;
        const starPercentageRounded = `${Math.round(
            starPercentage / 10) * 10}%`; */

  //     document.querySelector(`.${star} .star-inner`).styles.width = starPercentageRounded;

  //  document.querySelector(`.${star} .number-rating`).innerHTML = stars[star];
  //}

  const handleClick = (values) => {
    setCurrentValue(values);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let scores = [];
    scores.push(currentValue);
    console.log(scores);
    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "Your review has been sent successfully",
    });
  };

  return (
    <form>
      <div style={styles.container}>
        <h2>Barber's Rating</h2>
        <div>
          <div style={styles.stars} id="star-inner">
            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={24}
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                  color={
                    (hoverValue || currentValue) > index
                      ? colors.orange
                      : colors.grey
                  }
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => {
                    handleMouseOver(index + 1);
                  }}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })}
            <span id="number-rating">{/* {starPercentageRounded}  */}</span>
          </div>
        </div>
        <textarea placeholder="What's your feedback?" style={styles.textarea} />
        <button style={styles.button} onSubmit={handleSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    margin: "20px 0",
    minHeight: 100,
    padding: 10,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};
