import React from 'react';
import Gears from '../assets/gears.svg'

const AnimatedCard = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <img className="w-1/2 h-1/2 " src={Gears} alt="Gears" />
        </div>
    );
};

export default AnimatedCard;
