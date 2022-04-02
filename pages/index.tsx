/** @jsxImportSource theme-ui */
import React from "react";
import Explanation from "../src/Explanation";
import { hide, show } from "../src/FakeModa";
import { RenderActivatables } from "../src/hocActivatables";

async function fakeFetch(name: string) {
  // do some fetch
  await new Promise((resolve) => setTimeout(resolve, 600));
  // After finished, show the modal
  show({
    name,
    onConfirm: () => {
      alert("Modal confirmado");
      hide();
    },
  });
}

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <>
      <RenderActivatables />
      {isLoading && <h1>Loading</h1>}
      {!isLoading && (
        <div sx={{ margin: "auto", maxWidth: "900px", fontSize: "26px" }}>
          <Explanation />
          <input
            sx={{
              padding: "20px",
              width: "350px",
              fontSize: "20px",
              mr: "10px",
            }}
            defaultValue="Ingresa un texto"
            id="TEXT"
          />
          <button
            sx={{ padding: "20px", width: "150px", fontSize: "20px" }}
            onClick={() => {
              setIsLoading(true);
              fakeFetch(
                (document.querySelector("#TEXT") as HTMLInputElement).value
              ).then(() => setIsLoading(false));
            }}
          >
            Show
          </button>
        </div>
      )}
    </>
  );
}
