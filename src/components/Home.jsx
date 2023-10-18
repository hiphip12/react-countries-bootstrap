import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="background-img" style={{ minHeight: '80rem' }}>
      <div className="container mt-5">
        <h1 className="text-center">React & Bootstrap Weather App 🌤️</h1>
        <p className="text-center">Wheater status & forecats by country capital</p>

        <div className="card mx-auto" style={{ maxWidth: '60rem' }}>
          <div className="card-body text-center bg-warning">
            <h5 className="card-title" >Web APIs used:</h5>
            <ul className="card-text">{' '}
              <a href="https://restcountries.com/">https://restcountries.com/ </a></ul>
            <ul className="card-text">{' '}
              <a href="https://openweathermap.org/">https://openweathermap.org/</a></ul>
            <Button variant="success" onClick={() => navigate('/countries')}>
              Let me see it!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;