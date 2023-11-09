import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import OrderTableRow from "./OrderTableRow";

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([])
    console.log(orders);
    const url = `http://localhost:2500/myorders?email=${user?.email}`

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
                http://localhost:2500

/myorders/${id}`)
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
            <div className="space-y-1 px-36 text-right">
                <p>Total amount:
                    <span className="font-semibold">357 $</span>
                </p>
                <p className="text-sm text-gray-400">Not including taxes and shipping costs</p>
            </div>
            <div className="flex px-36 justify-end space-x-4">
                <button type="button" className="px-6 py-2 border rounded-md border-violet-400">Back
                    <span className="sr-only sm:not-sr-only">to shop</span>
                </button>
                <button type="button" className="px-6 py-2 border rounded-md bg-violet-400 text-gray-900 border-violet-400">
                    <span className="sr-only sm:not-sr-only">Continue to</span>Checkout
                </button>
            </div>
        </div>
    );
};

export default MyOrders;