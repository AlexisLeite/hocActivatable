/** @jsxImportSource theme-ui */
import { FaSquare, FaCheckSquare } from "@meronex/icons/fa";

export interface IFakeCheckbox {
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  checked: boolean;
  className?: string;
}

const light = false;

const FakeCheckbox = (props: IFakeCheckbox) => {
  return light ? (
    <button onClick={props.onClick}>
      <img src="https://via.placeholder.com/17" />
    </button>
  ) : (
    <button onClick={props.onClick}>
      {props.checked ? <FaCheckSquare /> : <FaSquare />}
    </button>
  );
};

export default FakeCheckbox;
