import { format } from 'date-fns'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { deleteRoom } from '../../api/rooms'
import DeleteModal from '../../Components/Modal/DeleteModal'
import UpdateModalText from '../../Components/Modal/UpdateModalText'


const RoomDataRow = ({ room, refetch }) => {
    let [isOpen, setIsOpen] = useState(false)
    const [openTextModal, setOpenTextModal] = useState(false)

    function closeTextModal() {
        setOpenTextModal(false)
    }


    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }
    const modalHandler = id => {
        console.log(id)
        deleteRoom(id)
            .then(data => {
                console.log(data)
                refetch()
                toast.success('Room deleted')
            })
            .catch(err => console.log(err))
        closeModal()
    }
    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                        <div className='block relative'>
                            <img
                                alt='profile'
                                src={room?.image}
                                className='mx-auto object-cover rounded h-10 w-15 '
                            />
                        </div>
                    </div>
                    <div className='ml-3'>
                        <p className='text-gray-900 whitespace-no-wrap'>{room?.title}</p>
                    </div>
                </div>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>{room?.location}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>${room?.price}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {format(new Date(room?.from), 'P')}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {format(new Date(room?.to), 'P')}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span onClick={openModal} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Delete</span>
                    <DeleteModal isOpen={isOpen}
                        modalHandler={modalHandler}
                        id={room._id}
                        closeModal={closeModal}
                    ></DeleteModal>
                </span>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span onClick={() => setOpenTextModal(true)}
                    className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Update</span>
                </span>
                <UpdateModalText
                    isOpen={openTextModal}
                    closeModal={closeModal}
                    closeTextModal={closeTextModal}

                ></UpdateModalText>
            </td>
        </tr>
    )
}

export default RoomDataRow
