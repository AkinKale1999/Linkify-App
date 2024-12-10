'use client';
import React, { useState } from 'react';
import { Footer } from '../../components/footer'
import SideBar from '../../components/sidebar'



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <>
    <SideBar setIsSideBarOpen={setIsSideBarOpen} />
    <div style={{ display: 'flex', transition: 'margin-left 0.3s ease' }}>
      <div
        style={{
          flex: 1,
          marginLeft: isSideBarOpen ? '230px' : '65px',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
        <Footer />
      </div>
      
    </div>
  </>
  );
}

