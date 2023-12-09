
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import Loding from "../../components/Shared/Loding";

const FoodPurchase = () => {
    const { user } = useContext(AuthContext)
    const [food, setFood] = useState({});
    const [orderQuantityRef, setOrderQuantityRef] = useState(0);
    const navigate = useNavigate();

    console.log("Check order Ref", orderQuantityRef);

    const { photo, category, _id, providerEmail, foodName, price, providerName, quantity, soldItems } = food;

    const params = useParams()
    console.log(params);
    const [loading, setLoading] = useState(true);

    let count = food.soldItems && soldItems || 0;

    useEffect(() => {
        axios.get(`https://restaurant-management-server-kappa.vercel.app/purchase/${params.id}`)
            .then(res => {
                setFood(res.data)
                setLoading(false)
            })
    }, [count, params])

    if (loading) {
        return <Loding></Loding>
    }

    console.log("Conditional value", count);

    console.log(food.soldItems, food.quantity);


    let quantityStr = food.quantity && food.quantity || 0

    const quantityInt = parseInt(quantityStr);

    const availableFood = quantityInt - orderQuantityRef;

    console.log(quantityInt, "Availabe food =", availableFood);


    // const initialSoldCount = food.soldItems;
    // const afterOrderSoldCount = initialSoldCount + count
    const handlePurchase = (e) => {
        e.preventDefault();
        const form = e.target;
        const orderDate = form.date.value;
        const buyerName = form.buyerName.value;
        const buyerEmail = form.buyerEmail.value;
        const orderedFood = { photo, providerEmail, providerName, category, orderDate, foodName, price, buyerName, quantity, buyerEmail }
        if (orderQuantityRef > quantityInt) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Out of stock!",
            });
        }
        if (availableFood < 0) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Out of Stock!",
            });
        }
        if (availableFood >= 0) {
            axios.post(`https://restaurant-management-server-kappa.vercel.app/order`, orderedFood)
                .then(res => {
                    console.log(res)
                    if (res.data.acknowledged) {

                        count += 1;
                        console.log('Updated Count', count);
                        const sendSellCount = { soldItems: count, availableFood }
                        Swal.fire({
                            title: "Congratulations!",
                            text: "Your Order has been placed!",
                            icon: "success"
                        });
                        axios.patch(`https://restaurant-management-server-kappa.vercel.app/foods/${_id}`, sendSellCount)
                            .then(res => {
                                console.log(res);
                                if (res.data.acknowledged) {
                                    navigate('/foods')
                                }
                            })
                            .catch(error => {
                                console.error("Error updating soldItems count:", error);
                                // Handle error, e.g., display an error message to the user
                            });
                    }
                })
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Not Available!",
            });
        }

    }
    document.title = "Purchase Food || Abir's Restaurant";
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
                            <span className="label-text text-lg font-semibold">Order Date</span>
                        </label>
                        <label className="input-group">
                            <input className="input input-bordered w-full" type="date" placeholder="Pick a Date" defaultValue={foodName} name="date" />
                        </label>
                    </div>
                </div>
                {/* name row */}
                <div className="lg:flex bg-[] gap-5">
                    <div className="flex-row form-control lg:w-1/2">
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Available Food</span>
                            </label>
                            <label className="input-group">
                                <input type="number" placeholder="Enter Food Quantity" defaultValue={quantity} name="quantity" className="input input-bordered w-full" />
                            </label>
                        </div>
                        <div className="flex-1">
                            <label className="label">
                                <span className="label-text text-lg font-semibold">Order Quantity</span>
                            </label>
                            <label className="input-group">
                                <input required onChange={e => setOrderQuantityRef(e.target.value)} type="number" placeholder="Enter Food Quantity" name="orderQuantity" className="input input-bordered w-full" />
                            </label>
                        </div>
                    </div>
                    <div className="form-control lg:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Food Price</span>
                        </label>
                        <label className="input-group">
                            <input type="text" placeholder="Enter Food Price" defaultValue={'$' + price + '.00'} name="price" className="input input-bordered w-full" />
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