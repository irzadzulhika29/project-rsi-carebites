
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import Sidebar from '../../components/dashboard/Sidebar';
import Navbar from '../../components/dashboard/Navbar';

const PaymentMethod = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [invoiceNumber, setInvoiceNumber] = useState('');

    // Generate random invoice number
    const generateInvoiceNumber = () => {
        const date = new Date();
        const random = Math.floor(Math.random() * 10000);
        return `INV/${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate()}/${random}`;
    };

    const location = useLocation();
    const { total, idUser, products, cartItems } = location.state || {}; // Assuming products is an array of items

    const [selectedMethod, setSelectedMethod] = useState({
        method: "Mandiri Virtual Account",
        logo: "https://www.cdnlogo.com/logos/b/21/bank-mandiri.svg",
        code: "499207558109",
    });

    const virtualAccounts = [
        {
            method: "BCA Virtual Account",
            logo: "https://storage.googleapis.com/rxstorage/Payment/06%20-%20BCA%20Logo.png",
            code: "123456789012",
        },
        {
            method: "BRI Virtual Account",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUA2kqUQIf_RTz3evvjkgAjnKC_piTxR0RUg&s",
            code: "987654321098",
        },
        {
            method: "Mandiri Virtual Account",
            logo: "https://www.cdnlogo.com/logos/b/21/bank-mandiri.svg",
            code: "499207558109",
        },
    ];

    const eWallets = [
        {
            method: "Gopay",
            logo: "https://i.pinimg.com/736x/94/3c/97/943c971903518e53ffd324dd51e46a90.jpg",
            code: "0895386809300",
        },
        {
            method: "OVO",
            logo: "https://bucket.utua.com.br/img/2021/05/27718b01-design-sem-nome.png",
            code: "0895386809300",
        },
    ];

    const handleSelectMethod = (method) => {
        setSelectedMethod(method);
    };

    const handleConfirmPayment = async () => {
        setIsLoading(true);

        const newInvoice = generateInvoiceNumber();
        setInvoiceNumber(newInvoice);

        let paymentData = [];
        
        if (cartItems) {
            paymentData = cartItems.map((cart) => ({
                id_user: idUser,
                id_produk: cart.id,
                metode_pembayaran: selectedMethod.method,
                jumlah_produk: cart.quantity, // Get the quantity for each product
                nomor_invoice: newInvoice,
                total_harga: total, // Assuming the total price for the product is passed
            }));
        } else {
            paymentData = products.map((product) => ({
                id_user: idUser,
                id_produk: product.id,
                metode_pembayaran: selectedMethod.method,
                jumlah_produk: product.quantity, // Get the quantity for each product
                nomor_invoice: newInvoice,
                total_harga: total, // Assuming the total price for the product is passed
            }));
        }

        try {
            // Update your API to handle an array of payment data
            await axios.post('http://localhost:8085/transaksi', paymentData);
            alert('Payment success');
            if (cartItems) {                
            localStorage.removeItem('cart');
            }
            setShowConfirmation(true);
        } catch (error) {
            console.error('Payment failed:', error.response || error);
            alert('Terjadi kesalahan saat memproses pembayaran.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <Navbar showSearchBar={false} />
                    <h1 className="mt-5 mx-10 text-2xl font-bold text-[#45c517]">Metode Bayar</h1>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        fill="currentColor"
                        className="text-green-500 hover:cursor-pointer mx-10 bi bi-arrow-left-short"
                        viewBox="0 0 16 16"
                        onClick={() => window.history.back()}
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                        />
                    </svg>
                    <section className="min-h-screen mx-10 my-5 ">
                        <div className="flex gap-5">
                            {/* Daftar Metode Pembayaran */}
                            <div className="py-5 rounded-xl p-5 w-[60%] bg-white shadow-md">
                                {/* Virtual Account Section */}
                                <h1 className="text-xl font-semibold text-[#45c517]">Virtual Account</h1>
                                <div className="mt-5 space-y-3">
                                    {virtualAccounts.map((method) => (
                                        <div
                                            key={method.method}
                                            className="flex items-center justify-between border-b pb-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={method.logo}
                                                    alt={method.method}
                                                    className="w-8 rounded-full border h-8 object-cover"
                                                />
                                                <span className="text-gray-700">{method.method}</span>
                                            </div>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method.method}
                                                className="accent-green-600 w-5 h-5"
                                                onChange={() => handleSelectMethod(method)}
                                                checked={selectedMethod.method === method.method}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {/* E-Wallet Section */}
                                <h1 className="mt-8 text-xl font-semibold text-[#45c517]">E-Wallet</h1>
                                <div className="mt-5 space-y-3">
                                    {eWallets.map((method) => (
                                        <div
                                            key={method.method}
                                            className="flex items-center justify-between border-b pb-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={method.logo}
                                                    alt={method.method}
                                                    className="w-8 rounded-full border h-8 object-cover"
                                                />
                                                <span className="text-gray-700">{method.method}</span>
                                            </div>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method.method}
                                                className="accent-green-600 w-5 h-5"
                                                onChange={() => handleSelectMethod(method)}
                                                checked={selectedMethod.method === method.method}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Detail Pembayaran */}
                            <div className="w-[40%] max-h-[340px] p-5 bg-white shadow-md rounded-xl space-y-5">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">Total Harga</h2>
                                    <p className="text-xl font-bold text-black">
                                        Rp{total?.toLocaleString('id-ID')}
                                    </p>
                                </div>
                                <div className="mb-5">
                                    <h2 className="text-lg font-semibold text-gray-800">Kode Bayar</h2>
                                    <div className="flex items-center gap-3 mt-5">
                                        <img
                                            src={selectedMethod.logo}
                                            alt={selectedMethod.method}
                                            className="w-8 rounded-full border h-8 object-cover"
                                        />
                                        <span className="text-gray-700 font-semibold">
                                            {selectedMethod.method}
                                        </span>
                                    </div>

                                    <div className="mt-5 flex items-center border border-green-500 rounded-lg py-2 px-3 bg-gray-50">
                                        <span className="text-md font-bold text-gray-900 flex-grow">
                                            {selectedMethod.code}
                                        </span>
                                        <button
                                            className="text-green-600 font-semibold"
                                            onClick={() => navigator.clipboard.writeText(selectedMethod.code)}
                                        >
                                            Salin
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className="bg-green-500 w-full py-3 rounded-xl text-white font-semibold"
                                    onClick={handleConfirmPayment}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Processing..." : "Konfirmasi Pembayaran"}
                                </button>
                            </div>

                            {showConfirmation && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white rounded-xl p-8 w-[400px] text-center">
                                        <div className="flex justify-center mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Pembayaran Berhasil!</h2>
                                        <p className="text-gray-600 mb-4">Terima kasih atas pembayaran Anda</p>
                                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                                            <p className="text-sm text-gray-600 mb-2">Nomor Invoice:</p>
                                            <p className="text-lg font-bold text-gray-800">{invoiceNumber}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setShowConfirmation(false);
                                                navigate('/home');
                                            }}
                                            className="bg-[#45c517] text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300"
                                        >
                                            Kembali
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default PaymentMethod;

