import { Link } from "react-router-dom";

const TopFood = ({ food }) => {
    const { photo, foodName, _id } = food
    return (
        <div className="card card-compact  bg-base-100 shadow-xl">
            <figure><img src={photo} alt="food" /></figure>
            <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <Link to={`/foods/${_id}`} className="btn text-white bg-[#FF7518]">
                        See Details</Link>
                </div>
            </div>
        </div>
    );
};

export default TopFood;