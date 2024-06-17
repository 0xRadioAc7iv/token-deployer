import { useParams } from "react-router-dom";

const Token = () => {
  const { params } = useParams();

  return (
    <button>
      <p>{params}</p>
    </button>
  );
};

export default Token;
