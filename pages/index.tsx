/** @jsxImportSource theme-ui */
import React from "react";
<<<<<<< HEAD
import { hocActivatable, RenderActivatables } from "../src/hocActivatables";

interface ICartelito {
  name: string;
}

function Cartelito({ name }: ICartelito) {
  return (
    <div
      sx={{
        position: "fixed",
        top: 30,
        bottom: 30,
        right: 30,
        left: 30,
        border: "2px solid blue",
      }}
    >
      {name}
    </div>
=======

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
>>>>>>> 0ecea0e5a61fee9de3b276de11f5bd56357e1090
  );
}

const { show, hide } = hocActivatable(Cartelito);

export default function Home() {
  const [name, setName] = React.useState("");
  return (
    <div>
      <RenderActivatables />
      <input onChange={(ev) => setName(ev.target.value)} />
      <button onClick={() => show({ name })}>ShowCartelito</button>
      <button onClick={() => hide()}>HideCartelito</button>
    </div>
  );
}
