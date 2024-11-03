
import { Link } from 'react-router-dom'

const LeftBar = () => {
  return (
    <nav className='leftbar'>
      <div className='flex flex-col gap-11'>
      <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logondname.png"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

      </div>

    </nav>
  )
}

export default LeftBar

