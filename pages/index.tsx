/** @jsxImportSource theme-ui */
import React from "react";

const Home = () => {
  const [value, setValue] = React.useState((newValue = 1) => {
    console.log("rendering state");
    return newValue;
  });

  return (
    <>
      <button className="Papas" onClick={() => setValue(value + 1)}>
        Update
      </button>
      {value}
    </>
  );
};

export default Home;
