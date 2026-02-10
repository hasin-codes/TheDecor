'use client';

import React, { useCallback, useState } from 'react';
import { Header } from './Header';
import { Menu } from './Menu';

export const HeaderWrapper: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};
