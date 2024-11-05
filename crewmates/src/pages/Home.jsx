import React from 'react';
import '../App.css'
import crewmateImage from '../../public/amongmain.png';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to the Crewmate Creator!</h1>
      <p className="home-paragraph">
        Here is where you can create your very own set of crewmates before sending them off into space!
      </p>
      <img src={crewmateImage} alt="Crewmates" className="home-image" />
    </div>
  )
}
  
export default Home;  