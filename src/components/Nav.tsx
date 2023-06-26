import { NavLink } from '@/components/NavLink';
import { SearchForm } from '@/components/SearchForm';

export function Nav() {
  return (
    <div className='tabs tabs-boxed flex items-center justify-between p-4 mt-8'>
      <div>
        <NavLink href='/'>Selected Movies</NavLink>
        <NavLink href='/search'>Search</NavLink>
        <NavLink href='/docs'>Documentation</NavLink>
      </div>
      <div>
        <SearchForm />
      </div>
    </div>
  );
}
