import { Link } from "react-router-dom";

const ErrorMyFood = () => {
    return (
        <div className="flex flex-col gap-5  justify-center h-screen items-center">
            <h2 className="font-bold text-5xl text-orange-600 text-center">You Haven't added any foods yet!
             </h2>
            <h2 className="font-bold text-5xl text-center bg-clip-text bg-gradient-to-r from-[#FF7518] to-[#1E2875] text-transparent inline-block">Please Add your food first!
             </h2>
             <Link to={`/foods`} className="btn  bg-orange-600 text-white hover:bg-clip-text hover:bg-gradient-to-r from-[#FF7518] to-[#1E2875] hover:text-transparent"> Add Food </Link>

        </div>
    );
};

export default ErrorMyFood;