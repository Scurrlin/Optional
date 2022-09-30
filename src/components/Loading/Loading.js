import Spinner from "react-bootstrap/Spinner";
import "./Loading.css";

function LoadingSpinner() {
  return (
    <>
      <div className="spinnerContainer">
        <Spinner className="spinner" animation="border" variant="info" />
      </div>
      <br/>
      <div className="loadingprompt">Loading.. Please Wait</div>
    </>
  );
}

export default LoadingSpinner;