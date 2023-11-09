
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import MyFoodRow from "./MyFoodRow";
import axios from "axios";

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
                        ></MyFoodRow>)
                    }

                </tbody>
            </table>
        </div>
    );
};

export default MyFood;