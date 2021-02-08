import React from 'react';
import Spinner from 'react-spinner-material';

import { Container } from './style.js'

const Loading = () => {
  return (
    <Container>
      <Spinner size={120} spinnercolor={"#333"} spinnerwidth={2} visible={true} />
    </Container>
  )
}

export default Loading;
