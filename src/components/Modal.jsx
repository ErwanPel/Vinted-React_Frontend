import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ModifyOffer from "./ModifyOffer";

import "../assets/css/signup-login.css";

export default function Modal({
  setUserToken,
  setVisibleLoginModal,
  visibleLoginModal,
  visibleSignModal,
  setVisibleSignModal,
  visibleModify,
  setVisibleModify,
  userToken,
}) {
  const closeModalSign = () => {
    setVisibleSignModal(() => false);
  };

  const closeModalLogin = () => {
    setVisibleLoginModal(() => false);
  };

  const closeModify = () => {
    setVisibleModify(() => false);
  };

  console.log("modal", userToken);

  return (
    <div
      className="modal-bloc"
      onClick={
        visibleLoginModal
          ? closeModalLogin
          : visibleSignModal
          ? closeModalSign
          : visibleModify && closeModify
      }
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
        {visibleModify && (
          <button className="close-button" onClick={closeModify}>
            X
          </button>
        )}
        {visibleLoginModal && (
          <LoginPage
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
        {visibleModify && (
          <ModifyOffer
            userToken={userToken}
            visibleModify={visibleModify}
            setVisibleModify={setVisibleModify}
          />
        )}
      </div>
    </div>
  );
}
