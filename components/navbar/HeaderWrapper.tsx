'use client';

import React, { useState } from 'react';
import { Header } from './Header';
import { Menu } from './Menu';

export const HeaderWrapper: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};
