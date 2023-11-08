import { Link } from "react-router-dom";

const Food = ({ food }) => {
    const { _id, name, photo, category, price, quantity } = food
    return (
        <div>
            <div className="card shadow-xl">
                <figure className="">
                    <img src={photo} alt="Shoes" className="rounded-xl h-60 w-full" />
                </figure>
            </div>
            <div className="card-body">
                <h2 className="card-title text-[#DC143C]">Food Name : {name}</h2>
                <p className="font-medium text-[#36454F]">Food Category : {category}</p>
                <p>Food Price : ${price}.00</p>
                <p>Available : {quantity}</p>
                <div className="card-actions">
                    <button className="btn text-white bg-[#FF7518]"><Link
                        to={`/foods/${_id}`}>See Details</Link></button>
                </div>
            </div>
        </div>
    );
};

export default Food;