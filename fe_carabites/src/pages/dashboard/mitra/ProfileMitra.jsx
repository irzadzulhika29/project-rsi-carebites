import { motion } from 'framer-motion';
import SidebarMitra from "../../../components/dashboard/mitra/SidebarMitra";
import NavbarMitra from "../../../components/dashboard/mitra/NavbarMitra";
import { Link } from "react-router-dom";

const ProfileMitra = () => {
    // Ambil data user dari localStorage
    const useData = JSON.parse(localStorage.getItem('user')) || {};

    return (
        <div className="flex min-h-screen">
            <SidebarMitra />

            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <NavbarMitra showSearchBar={false} />

                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-5 mx-10 text-2xl font-bold text-[#45c517]"
                    >
                        Profil
                    </motion.h1>
                    <section className="mx-10 my-5">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="p-5 min-h-screen w-full bg-white shadow-md rounded-xl"
                        >
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center text-center"
                            >
                                <img
                                    className="w-36 h-36 object-cover rounded-full"
                                    src={useData.avatar || 'https://via.placeholder.com/150'}
                                    alt="Avatar"
                                />
                                <h1 className="mt-3 text-2xl font-semibold">{useData.nama_user}</h1>
                                <p className="text-[#45c517]">{useData.alamat}</p>
                                <Link to="/edit-profil-mitra">
                                    <button className="bg-[#45c517] font-semibold mt-5 py-2 px-3 rounded-full text-white">
                                        Edit Profil
                                    </button>
                                </Link>
                            </motion.div>
                            {/* Additional profile information */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="mt-10 space-y-6 pt-5"
                            >
                                <h1 className="text-xl font-semibold text-[#45c517]">Informasi Lain</h1>
                                {[
                                    {
                                        label: "Email",
                                        value: useData.email,
                                        icon: (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-[#45c517]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 12h4M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        ),
                                    },
                                    {
                                        label: "Nomor Telepon",
                                        value: useData.no_telp_user,
                                        icon: (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-[#45c517]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 10h11M9 21V3m0 18l5-5M9 18l-5-5"
                                                />
                                            </svg>
                                        ),
                                    },
                                    {
                                        label: "Deskripsi",
                                        value: useData.deskripsi,
                                        icon: (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-[#45c517]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 14l6-6M3 14h6M9 10h6"
                                                />
                                            </svg>
                                        ),
                                    },
                                    {
                                        label: "Alamat",
                                        value: useData.alamat,
                                        icon: (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-[#45c517]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 14l4-4H8l4 4z"
                                                />
                                            </svg>
                                        ),
                                    },
                                    {
                                        label: "Nomor Rekening",
                                        value: useData.no_rek,
                                        icon: (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 text-[#45c517]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 14l4-4-4-4-4 4z"
                                                />
                                            </svg>
                                        ),
                                    },
                                ].map((info, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                        className="flex items-start gap-4 bg-gray-50 shadow-sm p-4 rounded-lg hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center justify-center bg-[#e9fbe5] p-3 rounded-full">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-gray-800 font-semibold">{info.label}</h3>
                                            <p className="text-gray-600">{info.value}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default ProfileMitra;
