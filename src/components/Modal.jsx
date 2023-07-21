import ModalConnexion from "./ModalConnexion";
import ModalSignIn from "./ModalSignIn";

import "../css/signup-connect.css";

export default function Modal({
  setIsConnected,
  setVisibleConnectModal,
  visibleConnectModal,

  visibleSignModal,
  setVisibleSignModal,
}) {
  const closeModalSign = () => {
    setVisibleSignModal(() => false);
  };

  const closeModalConnect = () => {
    setVisibleConnectModal(() => false);
  };

  return (
    <div
      className="modal-bloc"
      onClick={visibleConnectModal ? closeModalConnect : closeModalSign}
    >
      {visibleConnectModal && (
        <ModalConnexion
          setVisibleConnectModal={setVisibleConnectModal}
          setIsConnected={setIsConnected}
          closeModalConnect={closeModalConnect}
        />
      )}
      {visibleSignModal && (
        <ModalSignIn
          setIsConnected={setIsConnected}
          setVisibleSignModal={setVisibleSignModal}
          closeModalSign={closeModalSign}
        />
      )}
    </div>
  );
}
