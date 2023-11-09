
import axios from "axios";
import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const FoodPurchase = () => {
    const food = useLoaderData()
    console.log(food);
    const { user } = useContext(AuthContext)
    let count = 0;
    const { photo, category, _id, providerEmail, foodName, price, providerName, quantity } = food;

    const handlePurchase = (e) => {
        e.preventDefault();
        const form = e.target;
        const orderDate = form.date.value;
        const buyerName = form.buyerName.value;
        const buyerEmail = form.buyerEmail.value;
        const orderedFood = {photo, providerEmail, providerName, category, orderDate,  foodName, price, buyerName, quantity, buyerEmail }
        axios.post(`https://restaurant-management-server-kappa.vercel.app/order`, orderedFood)
            .then(res => {
                console.log(res.data)
                if (res.data.acknowledged) {
                    count++
                    const sendSellCount = { soldItems: count }
                    axios.patch(`https://restaurant-management-server-kappa.vercel.app/foods/${_id}`, sendSellCount)
                        .then(res => {
                            console.log(res.data);
                        })
                }
            })
    }
    return (
        <div className="bg-[#F4F3F0] px-8 lg:px-24 py-16">
            <h2 className="text-3xl font-bold text-center mb-10 text-[#FF7518]">Purchase Your Food</h2>
            <form onSubmit={handlePurchase}>
                {/* name row */}
                <div className="lg:flex bg-[] gap-5">
                    <div className="form-control lg:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Food Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" placeholder="Enter Food Name" defaultValue={foodName} name="name" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control lg:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Food Category</span>
                        </label>
                        <label className="input-group">
                        <input className="input input-bordered w-full" type="date" placeholder="Pick a Date" defaultValue={foodName} name="date" />
                        </label>
                    </div>
                </div>
                {/* name row */}
                <div className="lg:flex bg-[] gap-5">
                    <div className="form-control lg:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Food Quantity</span>
                        </label>
                        <label className="input-group">
                            <input type="number" placeholder="Enter Food Quantity" defaultValue={quantity} name="quantity" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control lg:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Food Price</span>
                        </label>
                        <label className="input-group">
                            <input type="text" placeholder="Enter Food Price" defaultValue={price} name="price" className="input input-bordered w-full" />
                        </label>
                    </div>

                </div>
                {/* another row */}
                <div className="lg:flex bg-[] gap-5">
                    <div className="form-control lg:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Your Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" readOnly value={user.displayName} name="buyerName" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control lg:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Your Email</span>
                        </label>
                        <label className="input-group">
                            <input type="email" name='buyerEmail' readOnly value={user.email} className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                {/* another row */}
                <input type="submit" name="Add" value="Purchase Now" className="btn btn-block btn-warning text-white mt-8" />
            </form>

        </div>
    );
};

export default FoodPurchase;