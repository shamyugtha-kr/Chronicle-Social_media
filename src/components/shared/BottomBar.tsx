import { bottombarLinks } from '@/constants';
import {Link, useLocation} from 'react-router-dom';

const BottomBar = () => {

  const {pathname} = useLocation();
  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link) => {
            const isActive = pathname === link.route
            return(
              
              <Link
              to={link.route}
              key={link.label}
              className={`${isActive && 'bg-gradient-to-r from-[#ff218c] to-[#ff8d19] rounded-[10px]'} flex-center flex-col gap-1 p-2 transition`}>
                <img
                src={link.imgURL}
                alt={link.label}
                width={25}
                height={25}
                className={`group-hover:invert-white ${isActive && 'invert-white'}`}/>
                <p className='tiny-medium text-light-2'>{link.label}</p>

              </Link>

            )
          })}

    </section>
  )
}

export default BottomBar