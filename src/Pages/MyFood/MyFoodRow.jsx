
import { Link } from "react-router-dom";

const MyFoodRow = ({ order, handleDelete }) => {
    const { photo, price, foodName, providerEmail, providerName, category, _id } = order;

    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="w-24 rounded-xl">
                            <img src={photo} />
                        </div>
                    </div>

                    <div>
                        <div className="font-bold">{foodName}</div>
                        <h3>Provider Name: <span>{providerName}</span></h3>
                        <h3>Provider Email: <span>{providerEmail}</span></h3>
                        <h3>Food Category : <span>{category}</span></h3>
                    </div>
                </div>
            </td>
            <td>
                ${price}.00
            </td>
            <th>
                <Link to={`/updatefood/${_id}`} className="btn bg-orange-600 text-white font-bold hover:bg-clip-text hover:bg-gradient-to-r from-[#FF7518] to-[#1E2875] hover:text-transparent hover:outline mr-3">Update Details</Link>
                <button onClick={() => handleDelete(_id)} className="btn text-white hover:bg-clip-text hover:outline bg-gradient-to-r from-[#FF7518] to-[#1E2875] hover:text-transparent inline-block">Delete</button>
            </th>
        </tr>
    );
};

export default MyFoodRow;