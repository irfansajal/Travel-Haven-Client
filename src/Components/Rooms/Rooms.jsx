import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Heading from '../Heading/Heading';
import Container from '../Shared/Container/Container';
import Loader from '../Shared/Loader';
import Card from './Card';
import Lottie from 'lottie-react'
import cat from '../../../public/animation_lm9cvp97.json'
import { getAllRooms } from '../../api/rooms';


const Rooms = () => {
    const [params, setParams] = useSearchParams()
    const category = params.get('category')
    // console.log(category);

    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      

       /*  fetch('./Rooms.json')
            .then(res => res.json()) */
            getAllRooms()
            .then(data => {
                if (category) {
                    const filtered = data.filter(room => room.category === category)
                    setRooms(filtered)
                    console.log(filtered);
                }

                else {
                    setRooms(data)

                    // console.log(data);

                }
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [category])
    //Loading system
    if (loading) {
        return <Loader></Loader>
    }
    return (
        <Container>
            {
                rooms && rooms.length > 0 ? <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {rooms.map((room, index) => (
                        <Card key={index} room={room}></Card>
                    ))}
                </div> : (


                    <div className=' pt-12'>
                        <div className=" mx-auto w-52 h-52">
                            <Lottie animationData={cat} loop={true} />
                        </div>

                        <Heading
                            title='Currently no Rooms available in this Category!'
                            subtitle='Please select other Categories for now'
                            center={true}
                        />
                    </div>

                )
            }
        </Container >
    );
};

export default Rooms;