import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CharityCardLS = ({
    id,
    image,
    title,
    isActive,
    targetDonation,
    collectedAmount
}) => {
    const navigate = useNavigate();
    const percentage = (collectedAmount / targetDonation) * 100;

    const handleEdit = () => {
        navigate(`/update-charity-ls/${id}`);
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-md overflow-hidden w-64"
        >
            <div className="relative h-36 w-full">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-[#45c517] text-white' : 'bg-gray-500 text-white'}`}>
                    {isActive ? 'Aktif' : 'Tidak Aktif'}
                </div>
            </div>

            <div className="p-3">
                <h3 className="text-base font-semibold text-gray-800 mb-2 truncate">{title}</h3>

                <div className="w-full h-1.5 bg-gray-200 rounded-full mb-2">
                    <div
                        className="h-full bg-[#45c517] rounded-full"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                </div>

                <div className="flex justify-between items-center text-xs">
                    <div>
                        <p className="text-gray-500">Terkumpul</p>
                        <p className="font-semibold text-[#45c517]">
                            Rp {collectedAmount.toLocaleString()}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-gray-500">Target</p>
                        <p className="font-semibold text-gray-700">
                            Rp {targetDonation.toLocaleString()}
                        </p>
                    </div>
                </div>

                <p className="text-xs text-gray-500 mt-1 text-center">
                    {percentage.toFixed(1)}% tercapai
                </p>

                <div className="mt-3 flex justify-between">
                    <button
                        onClick={handleEdit}
                        className="bg-[#45c517] hover:bg-[#3ba313] text-white font-bold py-1.5 px-4 rounded-full transition duration-300 text-xs w-20"
                    >
                        Edit
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1.5 px-4 rounded-full transition duration-300 text-xs w-20">
                        Hapus
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default CharityCardLS;