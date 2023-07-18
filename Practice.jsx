import React from 'react';
import { useForm } from 'react-hook-form';

const Practice = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const name=data.name;
        console.log(name)
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input required {...register("name")} />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Practice;
