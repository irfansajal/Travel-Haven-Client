import React, { useContext, useState } from 'react';
import { addRoom } from '../../api/rooms';
import { imageUpload } from '../../api/utils';
import AddRoomForm from '../../Components/Forms/AddRoomForm';
import { AuthContext } from '../../providers/AuthProvider';

const AddRoom = () => {
     const [dates,setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
     })
    const {user} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [uploadButtonText,setUploadButtonText] = useState('upload Image')
    // handle submit button
    const handleSubmit = event => {
        setLoading(true)
        event.preventDefault()
        const location = event.target.location.value;
        const title = event.target.title.value;
        const from = dates.startDate 
        const to = dates.endDate
        const price = event.target.price.value;
        const total_guest = event.target.total_guest.value;
        const bedrooms = event.target.bedrooms.value;
        const bathrooms = event.target.bathrooms.value;
        const description = event.target.description.value;
        const category = event.target.category.value;
        const image = event.target.image.files[0]

        //upload image 
        imageUpload(image)
       /*  .then(data => console.log(data.data.display_url
            )) */
            .then(data =>{
            const roomData = {
                location,
                title,
                from,
                to,
                price:parseFloat(price),
                total_guest,
                bedrooms,
                bathrooms,
                description,
                image:data.data.display_url,
                host:{
                    name:user?.displayName,
                    image:user?.photoURL,
                    email:user?.email,
                },
                category,
            }

            //post room data to server
            addRoom(roomData)
            .then(data => console.log(data))
            .catch(err => console.log(err.message))
            console.log(roomData);
        setLoading(false)
        
        })
        .catch(err => {
            console.log(err.message)
            setLoading(false)
        })
    }
   
    //selecting date range function
    const handleDates = ranges =>{
       //return console.log(ranges.selection);
        setDates(ranges.selection)
    }
    //image button change
    const handleImageChange = image => {
        setUploadButtonText(image.name)
    }
    return (
        <>
            <AddRoomForm 
            handleSubmit={handleSubmit}
             loading={loading} 
             handleImageChange={handleImageChange}
             uploadButtonText={uploadButtonText}
             dates={dates}
             handleDates= {handleDates} 
             ></AddRoomForm>
        </>
    );
};

export default AddRoom;