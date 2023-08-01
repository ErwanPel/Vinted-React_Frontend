import ConnexionPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

import "../assets/css/signup-login.css";

export default function Modal({
  setUserToken,
  setVisibleLoginModal,
  visibleLoginModal,
  visibleSignModal,
  setVisibleSignModal,
}) {
  const closeModalSign = () => {
    setVisibleSignModal(() => false);
  };

  const closeModalLogin = () => {
    setVisibleLoginModal(() => false);
  };

  return (
    <div
      className="modal-bloc"
      onClick={visibleLoginModal ? closeModalLogin : closeModalSign}
    >
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        {visibleLoginModal && (
          <button className="close-button" onClick={closeModalLogin}>
            X
          </button>
        )}
        {visibleSignModal && (
          <button className="close-button" onClick={closeModalSign}>
            X
          </button>
        )}
        {visibleLoginModal && (
          <ConnexionPage
            visibleLoginModal={visibleLoginModal}
            setVisibleLoginModal={setVisibleLoginModal}
            setUserToken={setUserToken}
            closeModalLogin={closeModalLogin}
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
