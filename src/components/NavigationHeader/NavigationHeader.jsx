import React from "react";

//scss
import "./NavigationHeader.scss";
import { NavLink, Link, withRouter } from "react-router-dom";
function NavigationHeader(props) {

  const {match} = props;
  // console.log(props);
  
  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  const handleSignOut = () => {
    props.auth.logout();
    props.history.push("/");
  };

  return (
    <section id="navigation">
      <div className="topnav d-flex" id="myTopnav">
        <NavLink
          to={`${match.url}/profile`}
          className="link-to"
          activeStyle={{
            backgroundColor: "#4CAF50",
            color: "white",
          }}
        >
          Profile
        </NavLink>
        <NavLink
           to={`${match.url}/dashboard`}
          className="link-to"
          activeStyle={{
            backgroundColor: "#4CAF50",
            color: "white",
          }}
        >
          My Drive
        </NavLink>
        <NavLink
           to={`${match.url}/about`}
          className="link-to"
          activeStyle={{
            backgroundColor: "#4CAF50",
            color: "white",
          }}
        >
          About
        </NavLink>
        <Link to="/" className="logout link-to ml-auto" onClick={handleSignOut}>
          Logout
        </Link>
        <span class="icon" onClick={myFunction}>
          <i class="fa fa-bars"></i>
        </span>
      </div>
    </section>
  );
}

export default withRouter(NavigationHeader);
