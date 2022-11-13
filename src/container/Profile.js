import React, { useState } from "react"
import Navigation from "../components/NavigationHeader/NavigationHeader"
import "../css/profile.scss"
// import Auth from "./auth";

function Profile(props) {
  const assets_url = process.env.REACT_APP_ASSETS_URL

  const getUser = () => {
    if (localStorage.getItem("userLog")) {
      const data = JSON.parse(localStorage.getItem("tempUser"))
      return data
    } else {
      const data = JSON.parse(localStorage.getItem("userLogInInfo"))
      data.forEach((items) => {
        if (props.user.name === items.email) {
          return items
        }
      })
    }
  }

  const [userData, _] = useState(getUser())


  return (
    <React.Fragment>
      <Navigation />
      <div className='header'>
        <h1>Profile</h1>
      </div>
      <div className='profile-group'>
        <div className='img-container'>
          <img
            className='profile-img'
            src={`${assets_url}/img/avatar_ixibsd`}
            alt='profile-pic'
          />
        </div>
        <div className='profile-form'>
          <div className='user name'>
            <span className='left-element'>
              <h5>Full Name</h5>
            </span>
            <div className=' right fname'>{userData.name}</div>
          </div>
          <div className='about'>
            <div className='desc'>{userData.desc}</div>
          </div>
          <div className='user location'>
            <span className='left-element'>
              <h5>Current Location</h5>
            </span>
            <div className=' right loc'>{userData.location}</div>
          </div>
          <div className='user mail-id'>
            <span className='left-element'>
              <h5>Email-ID</h5>
            </span>
            <div className='right mailid'>{userData.email}</div>
          </div>
          <div className='user phone'>
            <span className='left-element'>
              <h5>Mobile Number</h5>
            </span>
            <div className='right phone-number'>{userData.number}</div>
          </div>
          <div className='user town'>
            <span className='left-element'>
              <h5>Home Town</h5>
            </span>
            <div className='right home'>{userData.hometown}</div>
          </div>
          <div className='user graduation'>
            <span className='left-element'>
              <h5>Graduation</h5>
            </span>
            <div className='right qualif'>B.E Mechanical</div>
          </div>
          <div className='user status'>
            <span className='left-element'>
              <h5>Maritial Status</h5>
            </span>
            <div className='right mar-stu'>{userData.status}</div>
          </div>
        </div>
      </div>
      <button
        type='button'
        className='bttn-upload'
        onClick={() => alert("sorry we dont have this functionality")}
      >
        Edit
      </button>
    </React.Fragment>
  )
}

export default Profile
