
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import MyFoodRow from "./MyFoodRow";
import axios from "axios";

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [myFoods, setMyFoods] = useState([])
    console.log(myFoods);

    const url = `http://localhost:2500/myfoods?email=${user?.email}`

    useEffect(() => {
        axios.get(url, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setMyFoods(res.data)
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
                axios.delete(`http://localhost:2500/myorders/${id}`)
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
        <div className="px-36">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Service Name</th>
                        <th>Service Charge</th>
                        <th>Order Date</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        myFoods.map(order => <MyFoodRow
                            key={order._id}
                            order={order}
                            handleDelete={handleDelete}
                        ></MyFoodRow>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;