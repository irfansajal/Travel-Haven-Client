import { useContext } from 'react';
import avatar from '../../../assets/images/placeholder.jpg'
import { AuthContext } from '../../../providers/AuthProvider';

const Avatar = () => {
    const {user} = useContext(AuthContext)

    return (
        <div>
           <img src={user && user.photoURL ? user.photoURL : avatar} alt=""  height='30' width='30' className='rounded-full'/> 
        </div>
    );
};

export default Avatar;