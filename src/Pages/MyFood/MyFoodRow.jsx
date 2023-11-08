
const MyFoodRow = ({ order, handleDelete, handleConfirm }) => {
    const { photo, price, date, title, _id, status } = order;


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
                        <div className="font-bold">{title}</div>
                        {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                </div>
            </td>
            <td>
                ${price}
            </td>
            <td>{date}</td>
            <th>
                {
                    status ? <span className="font-bold text-primary">Confirm</span> :
                    <button onClick={() => handleConfirm(_id)} className="btn btn-ghost">Confirm</button>
                }            </th>
        </tr>
    );
};

export default MyFoodRow;