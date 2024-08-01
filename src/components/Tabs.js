// src/components/Tabs.js
import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div>
      <div className="tabs">
        {children.map((child) => (
          <button
            key={child.props.label}
            onClick={() => handleClick(child.props.label)}
            className={child.props.label === activeTab ? 'active' : ''}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;
