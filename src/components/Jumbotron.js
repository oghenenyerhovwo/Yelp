import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
  
import React from 'react';
import { Link } from 'react-router-dom';
  
  
export default function JumbotronComponent(props) {
  return (
    <>
    <Jumbotron>
      <h1 style={{fontSize: "2.5rem"}}>Welcome to Yelp Camp!</h1>
      <p>
        View our hand-picked campgrounds from all over the world
      </p>
  
      <p>
        <Link to="/signin/?redirect=newcampground">
          <Button>
            Add New Campground
          </Button>
        </Link>
      </p>
    </Jumbotron>
    </>
  );
}