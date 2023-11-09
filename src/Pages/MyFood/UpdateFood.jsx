import axios from "axios";
import { useLoaderData } from "react-router-dom";

const UpdateFood = () => {
    const food = useLoaderData()
    console.log(food);
    const {_id, foodName, category, photo, price, soldItems, description, quantity, providerEmail, providerName, } = food
    
    const handleUpdate = e => {
        e.preventDefault();
        const form = e.target;
        const foodName = form.name.value;
        const providerName = form.maker.value;
        const category = form.category.value;
        const quantity = form.quantity.value;
        const price = form.price.value;
        const providerEmail = form.email.value;
        const description = form.description.value;
        const photo = form.photo.value;

        const updatedFood = {foodName, soldItems, providerEmail, providerName, category, quantity, price, photo, description}
        axios.patch(`http://localhost:2500/updatefood/${_id}`, updatedFood)
        .then(res => {
            console.log(res.data);
        })
    }
    return (
        <div className="bg-[#F4F3F0] px-8 lg:px-24 py-16">
            <h2 className="text-3xl font-bold">Update Food details through this form</h2>
            <form onSubmit={handleUpdate}>
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
                            <select type="text" placeholder="Enter Food Category" defaultValue={category} name="category" className="input input-bordered w-full">
                                <option value='Burger'>Burger</option>
                                <option value='Pizza'>Pizza</option>
                                <option value='Meats'>Meats</option>
                                <option value='Milk Shake'>Milk Shake</option>
                                <option value='Sandwich'>Sandwich</option>
                                <option value='Vegetables'>Vegetables</option>
                                <option value='Salad'>Salad</option>
                                <option value='Dringkings'>Dringkings</option>
                                <option value='Other'>Other</option>
                            </select>
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
                            <input type="text" readOnly value={providerName} name="maker" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control lg:w-1/2">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Your Email</span>
                        </label>
                        <label className="input-group">
                            <input type="email" name='email' readOnly value={providerEmail} className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                {/* another row  */}
                <div className="lg:flex bg-[] gap-5">
                    <div className="form-control lg:w-full">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Photo</span>
                        </label>
                        <label className="input-group">
                            <input type="url" placeholder="Enter Photo URL" defaultValue={photo} name="photo" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                {/* another row */}
                <div className="lg:flex bg-[] gap-5">
                    <div className="form-control lg:w-full">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Short Description</span>
                        </label>
                        <label className="input-group">
                            <textarea defaultValue={description} rows="100" cols="5" type="text" placeholder="Write about the ingredients, making procedure, etc." name="description" className="input h-40 pt-3 input-bordered w-full" />
                        </label>
                    </div>
                </div>
                <input type="submit" name="Add" value="Update Food" className="btn btn-block btn-primary text-white mt-8" />
            </form>

        </div>
    );
};

export default UpdateFood;