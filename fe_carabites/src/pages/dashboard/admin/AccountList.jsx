import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SidebarAdmin from '../../../components/dashboard/admin/SidebarAdmin';
import NavbarAdmin from '../../../components/dashboard/admin/NavbarAdmin';
import axios from 'axios';

const AccountList = () => {
    const [acceptedAccounts, setAcceptedAccounts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        function getUSer() {
            const url = `http://localhost:8085/user`;
      
            axios.get(url)
                .then(response => {                    
                  const pendingRequests = response.data.filter(user => user.is_verif === '1');
                  setAcceptedAccounts(pendingRequests);
                })
                .catch(error => {
                    console.error('There was an error making the request:', error);
                });
        }   
        getUSer();  
    }, []);

    const totalPages = Math.ceil(acceptedAccounts.length / rowsPerPage);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = acceptedAccounts.slice(indexOfFirstRow, indexOfLastRow);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const tableVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="flex min-h-screen">
            <SidebarAdmin />
            <div 
                className="bg-[#f4fef1] w-full pl-60 pt-20"
               
            >
                <div className="flex-grow">
                    <NavbarAdmin />

                    <h1 className='text-2xl font-bold text-[#45c517] mt-5 mx-10'>Daftar Akun</h1>
                    <motion.section 
                        className="p-5 mx-10 my-5 rounded-xl bg-white shadow-md"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h2 
                            className="text-lg font-semibold mb-4 text-[#45c517]"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Akun Terverifikasi
                        </motion.h2>
                        <motion.div 
                            variants={tableVariants}
                        >
                            <table className="w-full text-left table-auto border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 w-16">No</th>
                                        <th className="px-4 py-2 w-56">Nama</th>
                                        <th className="px-4 py-2 w-64">Email</th>
                                        <th className="px-4 py-2 w-40">Role</th>
                                        <th className="px-4 py-2 w-40">Status</th>
                                    </tr>
                                </thead>
                                <AnimatePresence mode="wait">
                                    <tbody>
                                        {currentRows.map((account, index) => (
                                            <motion.tr
                                                key={account.id}
                                                className="hover:bg-gray-100 border-b"
                                                variants={rowVariants}
                                                whileHover={{ scale: 1.01 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <td className="px-4 py-4">{indexOfFirstRow + index + 1}</td>
                                                <td className="px-4 py-4 max-w-[16rem] truncate">{account.nama_user}</td>
                                                <td className="px-4 py-4">{account.email}</td>
                                                <td className="px-4 py-4">
                                                    <motion.span 
                                                        className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        {account.role}
                                                    </motion.span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <motion.span
                                                        className="px-2 rounded-full text-white bg-green-500"
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        {account.is_verif === '1' ? 'Approve' : account.is_verif}
                                                    </motion.span>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </AnimatePresence>
                            </table>
                        </motion.div>

                        <motion.div 
                            className="flex justify-between items-center mt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="flex items-center">
                                <label htmlFor="rowsPerPage" className="mr-2 text-sm font-medium">
                                    Tampilkan:
                                </label>
                                <select
                                    id="rowsPerPage"
                                    value={rowsPerPage}
                                    onChange={handleRowsPerPageChange}
                                    className="border rounded-md p-1 text-sm"
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                </select>
                            </div>

                            <div className="flex space-x-2">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-3 py-1 rounded-md text-sm ${
                                            currentPage === index + 1
                                                ? "bg-[#45c517] text-white"
                                                : "bg-gray-200 text-gray-700"
                                        }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {index + 1}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.section>
                </div>
            </div>
        </div>
    );
};

export default AccountList;