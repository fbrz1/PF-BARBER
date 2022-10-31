import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

export default function Stars() {
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  //const [input, setInput] = useState();
  const prods = useSelector((state) => state.products);

  //const score = useSelector((state) => state.score);
  //const feedback = useSelector((state) => state.feedback);
  /*     const prods = useSelector((state) => state.products)


    for (let star in stars){
        const starPercentage = (stars[star]/stars.length)*100;
        const starPercentageRounded = `${Math.round(
            starPercentage / 10) * 10}%`; */

  //     document.querySelector(`.${star} .star-inner`).styles.width = starPercentageRounded;

  //  document.querySelector(`.${star} .number-rating`).innerHTML = stars[star];
  //}

  const handleClick = (values) => {
    setCurrentValue(values);
    console.log(prods);
    console.log(values);
    console.log(score);
  };

  const handleMouseOver = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //score.push(currentValue);
    console.log(currentValue);
  };
  //setInput({
  /*    ...input,
      score: [...score, e.target.value],
      feedback: e.target.value,
    }); */
  /*    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: "Your review has been sent successfully",
    }); */
  //};
  const score = prods.map((el) => el.score);
  return (
    <form>
      <div style={styles.container}>
        <h2>Barber's Rating</h2>
        <div>
          <div style={styles.stars} id="star-inner">
            {stars.map((_, index) => {
              return (
                <FaStar
                  name="score"
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
            <span id="number-rating"> ({score.length} reviews)</span>
          </div>
        </div>
        <textarea
          name="feedback"
          type="text"
          placeholder="What's your feedback?"
          style={styles.textarea}
        />
        <button
          type="submit"
          value="Submit"
          style={styles.button}
          onSubmit={handleSubmit}
        >
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
