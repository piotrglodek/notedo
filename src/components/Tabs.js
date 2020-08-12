import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Tab = (props) => {
  const { onTabClick, label, activeTab, tabIcon } = props;
  const tabClasses = `${
    label === activeTab ? 'tabs__tab tabs__tab--active' : 'tabs__tab'
  }`;
  return (
    <button className={tabClasses} onClick={onTabClick}>
      {tabIcon}
      <span>{label}</span>
    </button>
  );
};

export const Tabs = (props) => {
  const { tabs } = props;

  const [activeTab, setActiveTab] = useState(tabs[0].label);
  const onTabClick = (label) => {
    setActiveTab(label);
  };

  return (
    <div className='tabs'>
      <div className='tabs__list'>
        {tabs.map((tab) => {
          const { label, tabIcon } = tab;
          return (
            <Tab
              key={label}
              tabIcon={tabIcon}
              label={label}
              activeTab={activeTab}
              onTabClick={() => {
                onTabClick(label);
              }}
            />
          );
        })}
      </div>
      <div className='tabs__content'>
        {tabs.map((tab) => {
          const { label, render } = tab;
          if (label !== activeTab) return undefined;
          return <React.Fragment key={label}>{render}</React.Fragment>;
        })}
      </div>
    </div>
  );
};
// FIXME: fix PROPTYPES FOR render prop
Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      tabIcon: PropTypes.element.isRequired,
      render: PropTypes.element.isRequired,
    })
  ).isRequired,
};

Tab.propTypes = {
  label: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  tabIcon: PropTypes.element.isRequired,
};
