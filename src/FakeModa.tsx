/** @jsxImportSource theme-ui */
import { hocActivatable } from "./hocActivatables";

interface IFakeModal {
  name: string;
  onConfirm: () => void;
}

function FakeModal({ name, onConfirm }: IFakeModal) {
  return (
    <div
      sx={{
        position: "fixed",
        top: 30,
        bottom: 30,
        right: 30,
        left: 30,
        border: "2px solid blue",
        bg: "white",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        sx={{
          padding: "40px",
          margin: "40px",
          border: "2px solid green",
          mt: 0,
          alignSelf: "stretch",
        }}
      >
        {name}
      </div>

      <button sx={{ padding: "20px", width: "150px" }} onClick={onConfirm}>
        Confirm modal
      </button>
    </div>
  );
}

export const { show, hide } = hocActivatable(FakeModal);
