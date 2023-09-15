import React from 'react';

import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Container>
      <div>Single Country will be here</div>
    </Container>
  );
};

export default CountriesSingle;
