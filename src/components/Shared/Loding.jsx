import Lottie from 'lottie-react';
import loading from '../../assets/loading.json';
const Loding = () => {
    return (
        <div className='flex h-screen justify-center items-center'>
            <Lottie animationData={loading} loop={true}></Lottie>
        </div>
    );
};

export default Loding;