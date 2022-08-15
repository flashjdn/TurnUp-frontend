import "./styles.css";

function HomeMask({ loaded }) {
  return (
    <div className={`home-mask ${loaded ? "mask-off" : "mask-on"}`}>
      <div className="spinner"></div>
    </div>
  );
}

export default HomeMask;
