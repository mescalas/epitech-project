import axios from "axios"
import React, {useEffect, useState} from "react"
import { getUserOrders } from "../../utils/getRequests"
import { useParams } from "react-router"
import { useForm } from "react-hook-form"


import Order from "./Order"


export default function Orders ({userData}) {

    const tab = "orders"
    const params = useParams()
    const tabActif = params.tabActif


    const [orders, setOrders] = useState()


    useEffect(() => {
        getUserOrders(userData.username)
        .then(result => {
            setOrders(result.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div className={`sm:mx-8 my-4 ${tabActif == tab ? "block" : "hidden"}`}>
            <h1 className="text-xl text-yellow-600 text-center m-4">
                MES COMMANDES
            </h1>
            <div className="flex flex-wrap items-center justify-center px-auto py-8 border-b-2 border-t-2 mx"> 
                <div className="sm:flex justify-center flex-wrap w-full p-4">
                    {orders && 
                        orders.map((order, index) => (
                            <Order 
                                reference={order.reference} 
                                status={order.status} 
                                update_at={order.update_at} 
                                created_at={order.created_at}
                                userData={userData} 
                                index={index}
                                key={index}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}