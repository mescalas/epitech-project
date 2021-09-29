import axios from "axios"
import React, {useEffect, useState} from "react"
import { getUserOrders } from "../../utils/getRequests"
import { useParams } from "react-router"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export default function Order ({userData, reference, status, updated_at, created_at, index}) {

    return (
        <div className={`w-full flex h-20 border border-gray-300 ${index % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
            <div className={`flex flex-col sm:flex-row justify-around w-full h-20 items-center p-2 text-gray-700 divide-x-2 divide-gray-300`}>
                <span className=" w-full  text-justify sm:text-center px-2">
                    {created_at.substring(0, 10)}
                </span>
                <span className=" w-full  text-justify sm:text-center font-bold px-2"> 
                    N° {reference}
                </span>
                <span className=" w-full text-justify sm:text-center px-2">
                    {status}
                </span>
            </div>
            <Link to={`/order/${reference}`} className="text-yellow-600 p-2 border rounded-md border-yellow-600 hover:border-yellow-700 hover:text-yellow-700 font-bold mx-4 h-1/2 flex my-auto">
                Détails
            </Link> 
        </div>
    )

}