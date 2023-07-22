import ConnexionPage from "../pages/ConnexionPage";
import SignUpPage from "../pages/SignUpPage";

import "../css/signup-connect.css";

export default function Modal({
  setUserToken,
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
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        {visibleConnectModal && (
          <button className="close-button" onClick={closeModalConnect}>
            X
          </button>
        )}
        {visibleSignModal && (
          <button className="close-button" onClick={closeModalSign}>
            X
          </button>
        )}
        {visibleConnectModal && (
          <ConnexionPage
            visibleConnectModal={visibleConnectModal}
            setVisibleConnectModal={setVisibleConnectModal}
            setUserToken={setUserToken}
            closeModalConnect={closeModalConnect}
          />
        )}
        {visibleSignModal && (
          <SignUpPage
            setUserToken={setUserToken}
            visibleSignModal={visibleSignModal}
            setVisibleSignModal={setVisibleSignModal}
            closeModalSign={closeModalSign}
          />
        )}
      </div>
    </div>
  );
}
