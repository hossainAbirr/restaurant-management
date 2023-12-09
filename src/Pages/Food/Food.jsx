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
                <h2 className="card-title text-[#DC143C] bg-clip-text bg-gradient-to-r from-[#FF7518] to-[#1E2875] text-transparent inline-block">Food Name : {name}</h2>
                <p className="font-medium text-[#36454F] bg-clip-text bg-gradient-to-r from-[#FF7518] to-[#1E2875] text-transparent inline-block">Food Category : {category}</p>
                <p className="bg-clip-text bg-gradient-to-r from-[#FF7518] to-[#1E2875] text-transparent inline-block">Food Price : ${price}.00</p>
                <p className="bg-clip-text bg-gradient-to-r from-[#FF7518] to-[#1E2875] text-transparent inline-block">Available : {quantity}</p>
                <div className="card-actions">
                    <Link to={`/foods/${_id}`} className="btn text-white bg-[#FF7518]">See Details</Link>
                </div>
            </div>
        </div>
    );
};

export default Food;