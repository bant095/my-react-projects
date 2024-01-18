import React from 'react';
import { FaTimes } from 'react-icons/fa';
import sublinks from './data';
import { useGlobalContext } from './context';

const Sidebar = () => {
  //setting state value
  const { isSidebarOpen, closeSidebar } = useGlobalContext();
  return (
    <div
      className={`${
        isSidebarOpen ? 'sidebar-wrapper show' : 'sidebar-wrapper'
      }`}
    >
      <aside className='sidebar'>
        <button className='close-btn' onClick={closeSidebar}>
          <FaTimes />
        </button>

        {/* dubble iteration */}
        <div className='sidebar-links'>
          {sublinks.map((item, index) => {
            const { links, page } = item;
            return (
              <artice key={index}>
                <h4>{page}</h4>
                {/* second iteration */}
                <div className='sidebar-sublinks'>
                  {links.map((link, index) => {
                    const { url, icon, label } = link;
                    return (
                      <a key={index} href={url}>
                        {icon}
                        {label}
                      </a>
                    );
                  })}
                </div>
              </artice>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
