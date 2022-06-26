import React from "react";
import { Link } from "react-router-dom";

//form
import SiginForm from "./SigninForm";
function Home(props) {
  const assets_url = process.env.REACT_APP_ASSETS_URL;
  const { serverError, loading, handleSubmit, focusHandler } = props;

  return (
    <section id="home">
      <div className="signin_wrapper">
        <img
          className="wave"
          src={`${assets_url}/img/wave_fkpmz4.png`}
          alt="back-ground img"
        />
        <div className="signin_content_wrapper">
          <div className="img">
            <img src={`${assets_url}/img/bg_zlivln.svg`} alt="side-img" />
          </div>
          <div className="login_content">
            <div className="form_container">
              <img src={`${assets_url}/img/avatar_ixibsd`} alt="avtaar-img" />
              <h2 className="title">Welcome</h2>
              <SiginForm focusHandler={focusHandler} handleSubmit={handleSubmit} loading={loading}/>
            </div>
            <div>
              <span className="register">Not Registered?</span>
              <span>
                <Link className="crt_acc" to="/signup">
                  Create Account
                </Link>
              </span>
            </div>
            {serverError && <div className="text-danger mt-2">{serverError}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
