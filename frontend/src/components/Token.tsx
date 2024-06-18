import { useParams } from "react-router-dom";

const Token = () => {
  const { process } = useParams();

  return (
    <button>
      <p>{process}</p>
    </button>
  );
};

export default Token;
