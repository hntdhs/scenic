import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import UserContext from "../auth/UserContext";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  return (
      <div className="Homepage">
        <div className="container-fluid"> 
            <div class="container text-center" id="app-name">
                <h1>NATIONAL SCENIC BYWAYS</h1>
            </div>
            <div class="container text-center">
                    {currentUser
                        ? <h2>
                            <div class="row justify-content-md-center">
                                <div class="col">
                                    Hi there and welcome, <span className="home-username">{currentUser.username}</span> !
                                </div>
                                <div class="col">
                                    <Link to={`/profile/${currentUser.username}`} class="link-success">View your profile, </Link>or if you haven't made one yet, <Link to="/profile" class="link-success">create and edit your profile here!</Link>
                                </div>
                            </div>
                            <div class="row justify-content-md-center">
                                <div class="col">
                                    <Link to="/search" class="link-success">See all byways and search using filters here!</Link><br></br>
                                </div>
                                <div class="col">
                                    <Link to="/states" class="link-success">See byways by state here!</Link><br></br>
                                </div>
                                <div class="col">
                                    <Link to="/random" class="link-success">Or see a byway at random!</Link>
                                </div>
                            </div>
                            
                        </h2>
                        : (
                            <h2>
                            <div class="row justify-content-md-center">
                                <div class="col">
                                    <Link to="/login" class="link-success">Log in</Link>
                                </div>
                                <div class="col">
                                    <Link to="/signup" class="link-success">Sign up</Link>
                                </div>
                            </div>
                            </h2>
                        )
                    
                    }
            </div>
        </div>  
        <div className="gallery">
            <figure class="gallery__item gallery__item--1">
                <img src="https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg" class="gallery__img" alt="Mountains" />
            </figure>
            <figure class="gallery__item gallery__item--2">
                <img src="https://www.travelandleisure.com/thmb/Ne05bVVgbqpA8FQIvI4vCifNUxA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hallerbos-forest-halle-belgium-2-BEAUTFORESTS0721-4ff5b556613e4814b5b7165f8851de39.jpg" class="gallery__img" alt="Forest" />
            </figure>
            <figure class="gallery__item gallery__item--3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/de/Elwha_River_-_Humes_Ranch_Area2.JPG" class="gallery__img" alt="River" />
            </figure>
            <figure class="gallery__item gallery__item--4">
                <img src="https://www.thoughtco.com/thmb/5M-JochOZmjKg9Pc3tK5zbpE_hU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/saguaro-cactus-forest-in-saguaro-national-park-arizona-946243008-5c4553fb46e0fb0001c1bbd8.jpg" class="gallery__img" alt="Desert" />
            </figure>
            <figure class="gallery__item gallery__item--5">
                <img src="https://media.cnn.com/api/v1/images/stellar/prod/180626120725-07-spectacular-coastlines-garden-route.jpg?q=w_4272,h_2403,x_0,y_0,c_fill/w_1280" class="gallery__img" alt="Coastline" />
            </figure>
            <figure class="gallery__item gallery__item--6">
                <img src="https://animals.sandiegozoo.org/sites/default/files/2016-08/habitats_hero_prairie.jpg" class="gallery__img" alt="Prarie" />
            </figure>        
        </div>

      </div>
  )
    
}

export default Homepage;