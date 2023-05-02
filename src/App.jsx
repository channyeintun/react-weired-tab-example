import React, { useState } from 'react';
import TabList from './TabList';

const App = () => {
  const [items] = useState([
    "All",
    "Orange",
    "Bananas",
    "Apple",
    "Pineapple"
  ]);

  return (
    <TabList items={items}/>
  );
};

export default App;
