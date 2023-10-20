import React from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../auth/firebase';
import { LinkContainer } from 'react-router-bootstrap';

const Home = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  return (
    <div className="background-img" style={{ minHeight: '55rem' }}>
      <div className="container mt-5">
        <h1 className="text-center text-light" style={{ textShadow: '0 0 4px white', color: 'black' }}>Wheater Forecast by Country Capital 🌤️</h1>
        <p className="text-center text-light" style={{ textShadow: '0 0 4px white', color: 'black' }}>This is a simple app built with React & Bootstrap</p>

        <div className="card mx-auto mt-5 border-0" style={{ maxWidth: '60rem' }}>
          <div className="card-body text-center bg-info rounded">
            <h5 className="card-title" >Web APIs used:</h5>
            <ul className="card-text">{' '}
              <a className="text-light" href="https://restcountries.com/">https://restcountries.com/ </a></ul>
            <ul className="card-text">{' '}
              <a className="text-light" href="https://openweathermap.org/">https://openweathermap.org/</a></ul>
            <h5 className="card-title" >Images are from:</h5>
            <ul className="card-text">{' '}
              <a className="text-light" href="https://unsplash.com/">https://unsplash.com/</a></ul>
            {user ? (<p>You are already logged in, use the menu on the top or

              {/* <LinkContainer to="/countries">
                <button className='border-0 bg-info text-decoration-underline text-light' > start here</button>
              </LinkContainer> */}
              <Link to="/countries" className="ms-1 text-light" >start here</Link>.
            </p>
            ) : (<div>
              <div>
                <small>Please Log in or Register to access (this is just a sample app, please use dummy info)</small>
              </div>
              <Button className="m-2" variant="light" onClick={() => navigate('/Login')}>
                Log In
              </Button>
              <Button className="m-2" variant="light" onClick={() => navigate('/Register')}>
                Register
              </Button> </div>)}
            {/* {user ? (
              <Button variant="secondary" hidden={loading} onClick={logout}>
                Logout</Button>) : (<LinkContainer to="/login"><Button variant="success">Login</Button></LinkContainer>)} */}
          </div>
        </div>
      </div>
    </div >
  );
};

export default Home;