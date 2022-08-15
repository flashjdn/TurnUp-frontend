import "./styles.css";

function Mask({ loaded }) {
  return (
    <div className={`mask ${loaded ? "mask-off" : "mask-on"}`}>
      <div className="spinner"></div>
    </div>
  );
}

export default Mask;
