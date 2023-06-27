'use client';

import { NavLink } from '@/components/NavLink';
import { usePathname } from 'next/navigation';

export function Nav() {
  const pathname = usePathname();

  return (
    <div className='tabs tabs-boxed flex items-center justify-between p-4 mt-8'>
      <div>
        <NavLink href='/' isActive={!pathname.includes('search')}>
          Playlist
        </NavLink>
        <NavLink href='/search' isActive={pathname.includes('search')}>
          Search
        </NavLink>
      </div>
    </div>
  );
}
