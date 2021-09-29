import React from 'react'
import { useForm } from 'react-hook-form';

export default function CustomTextArea ({ label, textContent }) {

    const { register } = useForm();

    return (
        <div>
            <label className="text-gray-700">
                {label}
            </label>
            <textarea {...register("description")} className="mt-1 w-full input" rows="3"> 
                { textContent }
            </textarea>
        </div>
    )
}