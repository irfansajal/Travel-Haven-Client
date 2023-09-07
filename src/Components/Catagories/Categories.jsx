import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../Shared/Container/Container';
import { categories } from './catagoriesData';
import CategoryBox from './CategoryBox/CategoryBox';

const Categories = () => {
    const [params,setParams] = useSearchParams()
    const value = params.get('category')
   // console.log(value);
    return (
        <Container>
            <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
                {
                    categories.map(item =>
                        <CategoryBox label={item.label}
                            icon={item.icon}
                            key={item.label}>

                            </CategoryBox>
                    )
                }
            </div>
        </Container>
    );
};

export default Categories;