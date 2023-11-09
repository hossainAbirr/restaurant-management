import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import OrderTableRow from "./OrderTableRow";

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([])
    console.log(orders);
    const url = `https://restaurant-management-server-kappa.vercel.app/myorders?email=${user?.email}`

    useEffect(() => {
        axios.get(url, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setOrders(res.data)
            })
    }, [url])

    const handleDelete = id => {
        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`
                https://restaurant-management-server-kappa.vercel.app/myorders/${id}`)
                    .then(result => {
                        console.log(result);
                        if (result.data.deletedCount > 0) {
                            const remaining = orders.filter(order => order._id !== id);
                            setOrders(remaining)
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    document.title = "My Orders || Abir's Restaurant";
    return (
        <div className="flex flex-col px-36 space-y-4 sm:p-10 bg-gray-900 text-gray-100">
            <h2 className="text-xl px-36 font-semibold">Your cart</h2>
            <ul className="flex px-36 flex-col divide-y divide-gray-700">
                {
                    orders.map(order => <OrderTableRow
                        key={order._id}
                        order={order}
                        handleDelete={handleDelete}
                    ></OrderTableRow>)
                }

            </ul>
            
        </div>
    );
};

export default MyOrders;