import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../auth/firebase';

const Home = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  return (
    <Container className="pt-5 background-img" style={{ minHeight: '62rem' }}>
      <h1 className="text-center text-light" style={{ textShadow: '0 0 4px white', color: 'black' }}>Weather Forecast by Country Capital 🌤️</h1>
      <p className="text-center text-light" style={{ textShadow: '0 0 4px white', color: 'black' }}>This is a simple app built with React & Bootstrap</p>

      <Card className="mx-auto mt-5 border-0" style={{ maxWidth: '60rem' }}>
        <Card.Body className="card-body text-center bg-info rounded">
          <h5 className="card-title" >Web APIs used:</h5>
          <p className="card-text">{' '}
            <a className="text-light" href="https://restcountries.com/">https://restcountries.com/ </a></p>
          <p className="card-text">{' '}
            <a className="text-light" href="https://openweathermap.org/">https://openweathermap.org/</a></p>
          <h5 className="card-title" >Images are from:</h5>
          <p className="card-text">{' '}
            <a className="text-light" href="https://unsplash.com/">https://unsplash.com/</a></p>
          {user ? (<p>You are already logged in, use the menu on the top or
            <Link to="/countries" className="ms-1 text-light" >start here</Link>. </p>) : (<Container>
              <Container>
                <small>Please Log in or Register to access (this is just a sample app, please use dummy info)</small>
              </Container>
              <Button className="m-2" variant="light" onClick={() => navigate('/Login')}>
                Log In
              </Button>
              <Button className="m-2" variant="light" onClick={() => navigate('/Register')}>
                Register
              </Button>
            </Container>)}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;