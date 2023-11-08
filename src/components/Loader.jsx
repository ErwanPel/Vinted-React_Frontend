import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/loader.css";

export default function Loader() {
  return (
    <div className="boxload">
      <FontAwesomeIcon
        className="boxload__loader"
        color="#09B1BA"
        icon="circle-notch"
      />
    </div>
  );
}
