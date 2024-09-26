import { BeatLoader, SquareLoader } from "react-spinners";

const SpinnerOne = () => {
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
};

const SpinnerTwo = () => {
  return (
    <div>
      <SquareLoader
        color="#FFFFFF"
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export { SpinnerOne, SpinnerTwo };
