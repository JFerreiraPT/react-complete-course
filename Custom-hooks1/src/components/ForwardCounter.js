import useCounter from '../hooks/use-counter';

import Card from './Card';

const ForwardCounter = () => {
  const counter = useCounter(-10, 'ASC');
  
  return <Card>{counter}</Card>;
};

export default ForwardCounter;
