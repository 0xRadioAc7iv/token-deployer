import { useNavigate } from "react-router-dom";

const TokenList = () => {
  const navigate = useNavigate();

  const checkToken = (process: string) => {
    navigate(`/token/${process}`);
  };

  return (
    <div>
      <button onClick={() => checkToken("3l4kf2r42")}>P1</button>
      <br />
      <button onClick={() => checkToken("qcw4r434a")}>P2</button>
      <br />
      <button onClick={() => checkToken("0wv455vse")}>P3</button>
    </div>
  );
};

export default TokenList;
