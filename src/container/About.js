import React from "react";
import "../css/about.scss";
// import Auth from "./auth";

function About(){
    return(
        <section id="about">
        <div className="header-about"><h1>About The Project</h1></div>
                <div className="about-container">
                    <p>This project is all about building a website using react based components with basic
                        functionality such as login and logout, the login and logout states are stored in the 
                        browser local Storage and the credential are also stored in the local storage. There is 
                        also a Photo Galley with some features such as pop up enlarge view of an images with 
                        slide and change photo feature.This is just an experimental project and further refinements
                        can be made. At the end of the project I got to learn a lot about react and an hands on 
                        experience in building a website. 
                    </p>
                    <p><strong>Thank you for going through my Project.</strong>

                    </p>

                </div>
        </section>

    )
}

export default About