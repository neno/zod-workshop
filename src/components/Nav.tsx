import { NavLink } from '@/components/NavLink';

export function Nav() {
  return (
    <div className='tabs tabs-boxed'>
      <NavLink href='/'>Selected Movies</NavLink>
      <NavLink href='/search'>Search</NavLink>
      <NavLink href='/docs'>Documentation</NavLink>
    </div>
  );
}
