import React, { useState, useEffect, useRef } from 'react';

const TabList = ({ items }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [dropdownItems, setDropdownItems] = useState([]);
  const containerRef = useRef();

  const updateItems = () => {
    const containerWidth = containerRef.current.clientWidth;
    let currentWidth = 200;

    const updatedVisibleItems = [];
    const updatedDropdownItems = [];

    items.forEach((item, index) => {
      const itemWidth = document.getElementById(`item-${index}`)?.clientWidth;
      currentWidth += itemWidth;

      if (currentWidth < containerWidth) {
        updatedVisibleItems.push(item);
      } else {
        updatedDropdownItems.push(item);
      }
    });

    setVisibleItems(updatedVisibleItems);
    setDropdownItems(updatedDropdownItems);
  };

  useEffect(() => {
    updateItems();
  }, [items]);

  useEffect(() => {
    const handleResize = () => {
      updateItems();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [items]);

  return (
    <div style={{ width: '100vw', fontSize: 20, whiteSpace: 'nowrap',padding:40 }}>
      <div ref={containerRef} style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', opacity:0, justifyContent:'space-between', gap:20 }}>
        {items.map((item, index) => (
          <div key={index} id={`item-${index}`} style={{width:'150px',background:'red'}}>
            {item}
          </div>
        ))}
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent:'space-between',gap:20 }}>
        {visibleItems.map((item, index) => (
          <div key={index} style={{width:'150px',background:'red'}}>
            {item}
          </div>
        ))}
        {dropdownItems.length > 0 && (
          <select style={{marginRight:20,width:200}}>
            {dropdownItems.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default TabList;
