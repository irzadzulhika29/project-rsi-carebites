import React from 'react';
import SidebarLS from '../../../components/dashboard/lembagasosial/SidebarLS';
import NavbarLS from '../../../components/dashboard/lembagasosial/NavbarLS';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import charityIn from '../../../assets/user/charityIn.json';
import { IoCloseOutline, IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import axios from 'axios';
import moment from 'moment';

const VerificationPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold mb-4 text-[#45c517]">Verifikasi Akun Diperlukan</h2>
                    <p className="mb-6 text-gray-600">Mohon verifikasi akun Anda terlebih dahulu untuk mengakses fitur lengkap.</p>
                    <div className="flex justify-center gap-5">
                        <Link to="/verif-form-ls">
                            <button
                                onClick={onClose}
                                className="bg-[#45c517] text-white px-6 py-2 rounded-full hover:bg-[#3ba313] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#45c517] focus:ring-opacity-50"
                            >
                                Verifikasi
                            </button>
                        </Link>

                        <button
                            onClick={onClose}
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                        >
                            Tutup
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
const DashboardLS = () => {
    const userData = JSON.parse(sessionStorage.getItem('user')) || {};
    const [selectedTransaksi, setSelectedTransaksi] = useState(null);
    const [allTransaksi, setAllTransaksi] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [transaksiPerPage, setTransaksiPerPage] = useState(15);
    const [showTransaksiPopup, setShowTransaksiPopup] = useState(false);
    const [totalHarga,setTotalHarga] = useState({});
    const [total,setTotal] = useState({});

    useEffect(() => {
        function getCountData() {
            const url = `http://localhost:8085/penggalangan/count/${userData.id}`;

            axios.get(url)
                .then(response => {                    
                    setTotal(response.data);
                })
                .catch(error => {
                    console.error('There was an error making the request:', error);
                });
        }

        // Call the function inside the useEffect
        getCountData();
    }, []);

    useEffect(() => {
        function getCountData() {
            const url = `http://localhost:8085/transaksi-p/count/${userData.id}`;

            axios.get(url)
                .then(response => {                    
                    setTotalHarga(response.data);
                })
                .catch(error => {
                    console.error('There was an error making the request:', error);
                });
        }

        // Call the function inside the useEffect
        getCountData();
    }, []);

    useEffect(() => {
        axios
          .get("http://localhost:8085/transaksi-p")
          .then((response) => {
            if (userData) {
              const filteredTransactions = response.data.filter(
                (transaction) => transaction.user._id === userData.id
              );
              // Sort transactions by date (descending)
              filteredTransactions.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
              );
              setAllTransaksi(filteredTransactions);              
              
              setTotalPages(
                Math.ceil(filteredTransactions.length / transaksiPerPage)
              );
            }
          })
          .catch((error) => {
            console.error("There was an error fetching the transaction data!", error);
          });
      }, [ transaksiPerPage]);

    // Get current transactions to display
    const currentTransactions = allTransaksi.slice(
        (currentPage - 1) * transaksiPerPage,
        currentPage * transaksiPerPage
    );

    // Handle pagination change
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    // Handle changing the number of transactions per page
    const handleTransaksiPerPageChange = (value) => {
        setTransaksiPerPage(value);
        setCurrentPage(1);
    };

    const handleDetailClick = (transaksi) => {
        setSelectedTransaksi(transaksi);
        setShowTransaksiPopup(true);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    const [showVerificationPopup, setShowVerificationPopup] = useState(false);
    // Add useEffect to trigger popup
    useEffect(() => {
        // Check if user is verified (you can replace this with your actual verification check)
        const isUserVerified = false; // Set this based on your user verification status
        if (!isUserVerified) {
            setShowVerificationPopup(true);
        }
    }, []);

    useEffect(() => {


        // Check if user is verified
        const isUserVerified = false;
        if (!isUserVerified) {
            setShowVerificationPopup(true);
        }
    }, []);

    return (
        <div className="relative flex min-h-screen">
            <SidebarLS />
            <section className="pb-16 bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <NavbarLS />
                    <motion.section
                        className="mx-10 mt-5 "
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >

                        <motion.h1
                            className='text-2xl font-bold text-[#45c517]'
                            variants={itemVariants}
                        >Dashboard </motion.h1>


                        <div className='my-5 flex gap-5 justify-between'>
                            <motion.div
                                variants={containerVariants}
                                className='w-1/3 flex justify-between gap-5 flex-col flex-wrap'>
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className='p-3 h-48 max-w-1/2 bg-white shadow-md rounded-xl'>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" className='bg-[#f4fef1] p-2 rounded-full' viewBox="0 0 24 24" fill="#45c517"><path d="M5.00488 9.00281C5.55717 9.00281 6.00488 9.45052 6.00488 10.0028C7.63965 10.0028 9.14352 10.5632 10.3349 11.5023L12.5049 11.5028C13.8375 11.5028 15.0348 12.0821 15.8588 13.0025L19.0049 13.0028C20.9972 13.0028 22.7173 14.1681 23.521 15.8542C21.1562 18.9748 17.3268 21.0028 13.0049 21.0028C10.2142 21.0028 7.85466 20.3996 5.944 19.3449C5.80557 19.7284 5.43727 20.0028 5.00488 20.0028H2.00488C1.4526 20.0028 1.00488 19.5551 1.00488 19.0028V10.0028C1.00488 9.45052 1.4526 9.00281 2.00488 9.00281H5.00488ZM6.00589 12.0028L6.00488 17.0248L6.05024 17.0573C7.84406 18.3177 10.183 19.0028 13.0049 19.0028C16.0089 19.0028 18.8035 17.8472 20.84 15.8734L20.9729 15.7398L20.8537 15.6394C20.3897 15.2764 19.8205 15.0512 19.2099 15.0097L19.0049 15.0028L16.8934 15.0028C16.9664 15.3244 17.0049 15.6591 17.0049 16.0028V17.0028H8.00488V15.0028L14.7949 15.0018L14.7605 14.9233C14.38 14.1297 13.593 13.5681 12.6693 13.5081L12.5049 13.5028L9.57547 13.5027C8.66823 12.5773 7.40412 12.0031 6.00589 12.0028ZM4.00488 11.0028H3.00488V18.0028H4.00488V11.0028ZM18.0049 5.00281C19.6617 5.00281 21.0049 6.34595 21.0049 8.00281C21.0049 9.65966 19.6617 11.0028 18.0049 11.0028C16.348 11.0028 15.0049 9.65966 15.0049 8.00281C15.0049 6.34595 16.348 5.00281 18.0049 5.00281ZM18.0049 7.00281C17.4526 7.00281 17.0049 7.45052 17.0049 8.00281C17.0049 8.55509 17.4526 9.00281 18.0049 9.00281C18.5572 9.00281 19.0049 8.55509 19.0049 8.00281C19.0049 7.45052 18.5572 7.00281 18.0049 7.00281ZM11.0049 2.00281C12.6617 2.00281 14.0049 3.34595 14.0049 5.00281C14.0049 6.65966 12.6617 8.00281 11.0049 8.00281C9.34803 8.00281 8.00488 6.65966 8.00488 5.00281C8.00488 3.34595 9.34803 2.00281 11.0049 2.00281ZM11.0049 4.00281C10.4526 4.00281 10.0049 4.45052 10.0049 5.00281C10.0049 5.55509 10.4526 6.00281 11.0049 6.00281C11.5572 6.00281 12.0049 5.55509 12.0049 5.00281C12.0049 4.45052 11.5572 4.00281 11.0049 4.00281Z"></path></svg>

                                    <h1 className='my-5 font-semibold text-[#45c517] text-3xl'>{total.totalPenggalanganActive || 0}</h1>
                                    <h1 className='my-5 font-semibold text-xl'>Active Campaign</h1>
                                </motion.div>
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className='p-3 h-48 max-w-1/2 bg-white shadow-md rounded-xl'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" className='bg-[#f4fef1] p-2 rounded-full' viewBox="0 0 24 24" fill="#45c517"><path d="M18.0049 6.99979H21.0049C21.5572 6.99979 22.0049 7.4475 22.0049 7.99979V19.9998C22.0049 20.5521 21.5572 20.9998 21.0049 20.9998H3.00488C2.4526 20.9998 2.00488 20.5521 2.00488 19.9998V3.99979C2.00488 3.4475 2.4526 2.99979 3.00488 2.99979H18.0049V6.99979ZM4.00488 8.99979V18.9998H20.0049V8.99979H4.00488ZM4.00488 4.99979V6.99979H16.0049V4.99979H4.00488ZM15.0049 12.9998H18.0049V14.9998H15.0049V12.9998Z"></path></svg>
                                    <h1 className='my-5 font-semibold text-[#45c517] text-3xl'>{total.totalPenggalangan || 0}</h1>
                                    <h1 className='my-5 font-semibold text-xl'>Total Campaign</h1>
                                </motion.div>

                            </motion.div>
                            <div className='w-2/3 flex justify-between gap-5 flex-col'>
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className='p-5 h-48 max-w-1/2 bg-white shadow-md rounded-xl'>
                                    <div className='w-full flex justify-between items-center'>
                                        <h1 className='text-xl font-semibold text-[#45c517]'>Total Donasi Aktif</h1>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" className='bg-[#f4fef1] p-2 rounded-full' viewBox="0 0 24 24" fill="#45c517"><path d="M5.00488 9.00281C5.55717 9.00281 6.00488 9.45052 6.00488 10.0028C7.63965 10.0028 9.14352 10.5632 10.3349 11.5023L12.5049 11.5028C13.8375 11.5028 15.0348 12.0821 15.8588 13.0025L19.0049 13.0028C20.9972 13.0028 22.7173 14.1681 23.521 15.8542C21.1562 18.9748 17.3268 21.0028 13.0049 21.0028C10.2142 21.0028 7.85466 20.3996 5.944 19.3449C5.80557 19.7284 5.43727 20.0028 5.00488 20.0028H2.00488C1.4526 20.0028 1.00488 19.5551 1.00488 19.0028V10.0028C1.00488 9.45052 1.4526 9.00281 2.00488 9.00281H5.00488ZM6.00589 12.0028L6.00488 17.0248L6.05024 17.0573C7.84406 18.3177 10.183 19.0028 13.0049 19.0028C16.0089 19.0028 18.8035 17.8472 20.84 15.8734L20.9729 15.7398L20.8537 15.6394C20.3897 15.2764 19.8205 15.0512 19.2099 15.0097L19.0049 15.0028L16.8934 15.0028C16.9664 15.3244 17.0049 15.6591 17.0049 16.0028V17.0028H8.00488V15.0028L14.7949 15.0018L14.7605 14.9233C14.38 14.1297 13.593 13.5681 12.6693 13.5081L12.5049 13.5028L9.57547 13.5027C8.66823 12.5773 7.40412 12.0031 6.00589 12.0028ZM4.00488 11.0028H3.00488V18.0028H4.00488V11.0028ZM18.0049 5.00281C19.6617 5.00281 21.0049 6.34595 21.0049 8.00281C21.0049 9.65966 19.6617 11.0028 18.0049 11.0028C16.348 11.0028 15.0049 9.65966 15.0049 8.00281C15.0049 6.34595 16.348 5.00281 18.0049 5.00281ZM18.0049 7.00281C17.4526 7.00281 17.0049 7.45052 17.0049 8.00281C17.0049 8.55509 17.4526 9.00281 18.0049 9.00281C18.5572 9.00281 19.0049 8.55509 19.0049 8.00281C19.0049 7.45052 18.5572 7.00281 18.0049 7.00281ZM11.0049 2.00281C12.6617 2.00281 14.0049 3.34595 14.0049 5.00281C14.0049 6.65966 12.6617 8.00281 11.0049 8.00281C9.34803 8.00281 8.00488 6.65966 8.00488 5.00281C8.00488 3.34595 9.34803 2.00281 11.0049 2.00281ZM11.0049 4.00281C10.4526 4.00281 10.0049 4.45052 10.0049 5.00281C10.0049 5.55509 10.4526 6.00281 11.0049 6.00281C11.5572 6.00281 12.0049 5.55509 12.0049 5.00281C12.0049 4.45052 11.5572 4.00281 11.0049 4.00281Z"></path></svg>
                                    </div>

                                    <div className='mt-12 p-0'>
                                        <p className='text-sm  text-gray-500'>s.d {moment(totalHarga.currentDate).format('D MMMM YYYY')}</p>
                                        <h1 className='font-semibold text-2xl text-[#45c517]'>Rp.{totalHarga.totalHargaActive?.toLocaleString("id-ID") || 0}</h1>
                                    </div>
                                </motion.div>
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className='p-5 h-48 max-w-1/2 bg-white shadow-md rounded-xl'>
                                    <div className='w-full flex justify-between items-center'>

                                        <h1 className='text-xl font-semibold text-[#45c517]'>Total Donasi Seluruh Campaign</h1>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" className='bg-[#f4fef1] p-2 rounded-full' viewBox="0 0 24 24" fill="#45c517"><path d="M18.0049 6.99979H21.0049C21.5572 6.99979 22.0049 7.4475 22.0049 7.99979V19.9998C22.0049 20.5521 21.5572 20.9998 21.0049 20.9998H3.00488C2.4526 20.9998 2.00488 20.5521 2.00488 19.9998V3.99979C2.00488 3.4475 2.4526 2.99979 3.00488 2.99979H18.0049V6.99979ZM4.00488 8.99979V18.9998H20.0049V8.99979H4.00488ZM4.00488 4.99979V6.99979H16.0049V4.99979H4.00488ZM15.0049 12.9998H18.0049V14.9998H15.0049V12.9998Z"></path></svg>

                                    </div>
                                    <div className='mt-12 p-0'>
                                        <p className='text-sm  text-gray-500'>s.d {moment(totalHarga.currentDate).format('D MMMM YYYY')}</p>
                                        <h1 className='font-semibold text-2xl text-[#45c517]'>Rp.{totalHarga.totalHargaAllTime?.toLocaleString("id-ID") || 0}</h1>
                                    </div>
                                </motion.div>

                            </div>
                        </div>

                        <section className="mt-8 w-full">
                            <motion.div
                                variants={containerVariants}
                                className=""
                            >
                                <motion.h2
                                    variants={itemVariants}
                                    className="text-xl font-semibold text-[#45c517] mb-4"
                                >
                                    Transaksi Donasi Masuk
                                </motion.h2>

                                {/* Filter for number of transactions */}
                                <div className="mt-5 flex items-center space-x-3 bg-[#45c517] text-white to-white p-4 rounded-t-lg shadow-sm border border-[#45c517]/20">
                                    <label htmlFor="transaksiPerPage" className="text-white font-medium">Show:</label>
                                    <select
                                        id="transaksiPerPage"
                                        value={transaksiPerPage}
                                        onChange={(e) => handleTransaksiPerPageChange(Number(e.target.value))}
                                        className="form-select block px-2 w-20 text-black rounded-md border-[#45c517]/30 bg-white shadow-sm focus:border-[#45c517] focus:ring-2 focus:ring-[#45c517]/40 transition-all duration-200"
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                        <option value={20}>20</option>
                                    </select>
                                    <span className="text-white">entries</span>
                                </div>


                                {/* Table Section */}
                                <motion.div
                                    className="overflow-x-auto  "
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <table className="min-w-full bg-white shadow-sm rounded-lg overflow-hidden">
                                        <thead className="bg-[#45c517]/10">
                                            <tr>
                                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">ID</th>
                                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Campaign</th>
                                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Donatur</th>                                                
                                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Total</th>
                                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Tanggal</th>

                                                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {currentTransactions.map((transaksi, index) => (
                                                <tr key={`${transaksi.id}-${index}`} className="hover:bg-gray-50 transition-colors">
                                                    <td className="py-4 px-6 text-sm text-gray-600">{transaksi.nomor_invoice}</td>
                                                    <td className="py-4 px-6 text-sm text-gray-600">{transaksi.penggalangan.namaGalangDana}</td>
                                                    <td className="py-4 px-6 text-sm text-gray-600">{transaksi.user?.nama_user || '-'}</td>
                                                    <td className="py-4 px-6 text-sm text-gray-600">Rp {transaksi.jumlah_penggalangan.toLocaleString("id-ID")}</td>                                                    
                                                    <td className="py-4 px-6 text-sm text-gray-600">{new Date(transaksi.createdAt).toLocaleDateString("id-ID")}</td>

                                                    <td className="py-4 px-6">
                                                        <button
                                                            onClick={() => handleDetailClick(transaksi)}
                                                            className="text-[#45c517] hover:text-[#3ba313] font-medium"
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>

                                  {/* Pagination */}
                                      <div className="mt-4 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                                    <div className="text-sm text-gray-600">
                                        Menampilkan {((currentPage - 1) * transaksiPerPage) + 1} - {Math.min(currentPage * transaksiPerPage, allTransaksi.length)} dari {allTransaksi.length} transaksi
                                    </div>
                                    <div className="flex space-x-2 items-center">
                                        <button
                                            onClick={() => goToPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="p-2 bg-[#45c517] text-white rounded-md hover:bg-[#3ba714] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#45c517] focus:ring-opacity-50"
                                        >
                                            <IoChevronBackOutline className="w-5 h-5" />
                                        </button>
                                        <span className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md">
                                            {currentPage} / {totalPages}
                                        </span>
                                        <button
                                            onClick={() => goToPage(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="p-2 bg-[#45c517] text-white rounded-md hover:bg-[#3ba714] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#45c517] focus:ring-opacity-50"
                                        >
                                            <IoChevronForwardOutline className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </section>

                        <TransaksiPopup
                            transaksi={selectedTransaksi}
                            isOpen={showTransaksiPopup}
                            onClose={() => setShowTransaksiPopup(false)}
                        />

                        <VerificationPopup
                            isOpen={showVerificationPopup}
                            onClose={() => setShowVerificationPopup(false)}
                        />
                    </motion.section>
                </div>
            </section >
        </div >
    )
}

const TransaksiPopup = ({ transaksi, isOpen, onClose }) => {
    if (!isOpen || !transaksi) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-[#45c517] text-white px-6 py-4 flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Detail Transaksi</h2>
                        <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
                            <IoCloseOutline size={24} />
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <InfoItem label="ID Transaksi" value={transaksi.nomor_invoice} />
                            <InfoItem label="Campaign" value={transaksi.penggalangan.namaGalangDana} />
                            <InfoItem label="Donatur" value={transaksi.user?.nama_user || '-'} />
                            <InfoItem label="No. Telepon" value={transaksi.user?.no_telp_user || '-'} />
                            <InfoItem label="Nominal" value={`Rp ${transaksi.jumlah_penggalangan.toLocaleString("id-ID")}`} />
                            <InfoItem label="Tanggal" value={new Date(transaksi.createdAt).toLocaleDateString("id-ID")} />
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-4 flex justify-end">
                        <button
                            onClick={onClose}
                            className="bg-[#45c517] text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        >
                            Tutup
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};



const InfoItem = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
    </div>
);

export default DashboardLS