import { BeatLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div>
      <BeatLoader
        color="#000000"
        loading={true}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
