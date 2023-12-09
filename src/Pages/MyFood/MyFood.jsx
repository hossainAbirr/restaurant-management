
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import MyFoodRow from "./MyFoodRow";
import axios from "axios";
import ErrorMyFood from "./ErrorMyFood";
import Swal from "sweetalert2";

const MyFood = () => {
    const { user } = useContext(AuthContext);
    const [myFoods, setMyFoods] = useState([])
    console.log(myFoods);

    const url = `https://restaurant-management-server-kappa.vercel.app/myfoods?email=${user?.email}`

    useEffect(() => {
        axios.get(url, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setMyFoods(res.data)
            })
    }, [url])
    if (myFoods.length === 0) {
        return <ErrorMyFood></ErrorMyFood>
    }
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
                axios.delete(`https://restaurant-management-server-kappa.vercel.app/delete/${id}`)
                    .then(res => {
                        console.log(res);
                        if (res.data.deletedCount > 0) {
                            const remaining = myFoods.filter(order => order._id !== id);
                            setMyFoods(remaining)
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
    document.title = "My Foods Food || Abir's Restaurant";
    return (
        <div className="px-36">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Food Details</th>
                        <th>Food Price</th>
                        <th>Action</th>
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

export default MyFood;