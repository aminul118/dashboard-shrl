import React from 'react';
import Quil2 from './Quil2';

const Quil2Wrapper: React.FC = () => {
  const [value, setValue] = React.useState('');
  return <Quil2 value={value} onChange={setValue} />;
};

export default Quil2Wrapper;
