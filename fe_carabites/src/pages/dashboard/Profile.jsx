import { motion } from "framer-motion";
import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";
import { useState, useEffect } from 'react';
import HistoryCard from "../../components/dashboard/profile/HistoryCard";
import { Link } from "react-router-dom";
import HistoryShare from "../../components/dashboard/profile/HistoryShare";

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [selectedNav, setSelectedNav] = useState('Riwayat Grab Meals');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setProfile(JSON.parse(storedUser));
        }
    }, []);

    const handleNavClick = (nav) => {
        setSelectedNav(nav);
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <Navbar showSearchBar={false} />

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="mt-10 mx-10 text-2xl font-bold text-[#45c517] animate-fadeIn">
                            Profile
                        </h1>
                    </motion.div>

                    <section className="mx-10 my-5">
                        <div className="p-5 min-h-screen w-full bg-white shadow-md rounded-xl">
                            {/* User Info */}
                            <div className="flex flex-col items-center text-center justify-center">
                                <img
                                    className="w-36 h-36 object-cover rounded-full"
                                    src={profile?.avatar || '/profile.png'}
                                    alt="User Avatar"
                                />
                                <h1 className="mt-3 text-2xl font-semibold">
                                    {profile?.nama_user || 'User'}
                                </h1>
                                <p className="text-[#45c517]">
                                    {profile?.alamat || 'Malang, Indonesia'}
                                </p>
                                <Link to="/profil/edit-profil">
                                    <button className="bg-[#45c517] font-semibold mt-5 py-2 px-3 rounded-full text-white">
                                        Edit Profile
                                    </button>
                                </Link>
                            </div>

                            {/* Navigation */}
                            <motion.div
                                className="mt-5 flex justify-between"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                {[
                                    "Riwayat Grab Meals",
                                    "Riwayat Sharing Meals",
                                    "Riwayat Activity",
                                    "Riwayat Charity",
                                    "Riwayat Article",
                                ].map((nav) => (
                                    <motion.p
                                        key={nav}
                                        onClick={() => handleNavClick(nav)}
                                        className={`hover:cursor-pointer pb-2 text-md font-semibold transition-colors duration-300 ${selectedNav === nav
                                                ? "border-b-2 border-[#45c517] text-[#45c517]"
                                                : "hover:text-[#45c517] hover:border-b-2 hover:border-[#45c517] text-gray-600"
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {nav}
                                    </motion.p>
                                ))}
                            </motion.div>

                            {/* History Card */}
                            <motion.div
                                className="mt-5 animate-slideUp"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                {selectedNav === "Riwayat Grab Meals" && (
                                    <motion.div
                                        className="p-4 w-full pb-5 bg-white shadow-md rounded-xl transform transition-transform duration-300 hover:-translate-y-2"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <HistoryCard />
                                    </motion.div>
                                )}

                                {selectedNav === "Riwayat Sharing Meals" && (
                                    <motion.div
                                        className="p-4 w-full pb-5 bg-white shadow-md rounded-xl transform transition-transform duration-300 hover:-translate-y-2"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <HistoryShare />
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default Profile;
