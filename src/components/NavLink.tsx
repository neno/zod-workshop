'use client';

import Link from 'next/link';
import { FC } from 'react';

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

export const NavLink: FC<NavLinkProps> = ({ href, isActive, children }) => {
  return (
    <Link href={href} className={`tab ${isActive && 'tab-active'}`}>
      {children}
    </Link>
  );
};
