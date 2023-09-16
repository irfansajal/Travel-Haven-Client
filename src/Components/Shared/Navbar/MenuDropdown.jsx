import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from './Avatar'
import { useCallback, useContext, useState } from 'react'
import { AuthContext } from '../../../providers/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import HostRequestModal from '../../Modal/HostRequestModal'
import { becomeHost } from '../../../api/auth'
import { toast } from 'react-hot-toast'

const MenuDropdown = () => {
  const navigate = useNavigate()
  const { user, logOut, role, setRole } = useContext(AuthContext)
  const [isOpen, setIsOpen] = useState(false)
  const [modal, setModal] = useState(false)
  /*  const toggleOpen = useCallback(() => {
     setIsOpen(value => !value)
   }, []) */

  //modal function
  const modalHandler = email => {
    //console.log('modal clicked');
    becomeHost(email)
      .then(data => {
        console.log(data)
        toast.success('You are Host now! post Rooms')
        setRole('host')
        navigate('/dashboard/add-room')
        closeModal()
      })
      .then(err => console.log(err.message))
  }
  const closeModal = () => {
    setModal(false)
  }
  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div className='hidden md:block text-sm font-semibold py-3 px-8 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
          {!role && <button onClick={() => setModal(true)} className='cursor-pointer' disabled={!user}> Travel Haven your home
          </button>}
        </div>
        <div
          onClick={() => { setIsOpen(!isOpen) }}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[30vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            <Link
              to='/'
              className='block  px-4 py-3 hover:bg-neutral-100 transition font-semibold'
            >
              Home
            </Link>
            {user ? (
              <>
                <Link
                  to='/dashboard'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Dashboard
                </Link>

                {/*  */}
                <div
                  onClick={() => {
                    setRole(null)
                    logOut()
                  }}
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Login
                </Link>
                <Link
                  to='/signUp'
                  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Sign Up
                </Link>


              </>
            )}
          </div>

        </div>
      )}
      <HostRequestModal
        email={user?.email}
        modalHandler={modalHandler}
        isOpen={modal}
        closeModal={closeModal}
      ></HostRequestModal>
    </div>
  )
}

export default MenuDropdown
