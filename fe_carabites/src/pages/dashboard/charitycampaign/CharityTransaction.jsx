import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../components/dashboard/Sidebar';
import Navbar from '../../../components/dashboard/Navbar';
import { Link } from 'react-router-dom';

const CharityTransaction = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [donationAmount, setDonationAmount] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');

    const formatNumber = (num) => Number(num).toLocaleString('id-ID');

    const handleNominalClick = (amount) => {
        setDonationAmount(formatNumber(amount));
        setSelectedAmount(amount);
    };

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/\./g, '').replace(/[^0-9]/g, '');
        const numericValue = value ? parseInt(value, 10) : '';
        setDonationAmount(numericValue ? formatNumber(numericValue) : '');
    };

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await axios.get(`http://localhost:8085/penggalangan/${id}`);
                setCampaign(response.data);
            } catch (error) {
                console.error('Error fetching campaign data:', error);
                setError('Data tidak ditemukan');
            } finally {
                setLoading(false);
            }
        };

        fetchCampaign();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!campaign) {
        return <p>Data tidak ditemukan</p>;
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <Navbar />
                    <section className="mt-10 min-h-screen mx-10 my-5 rounded-lg bg-white shadow-lg p-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Left Column: Campaign Image and Details */}
                            <div className="md:w-1/2">
                                <img
                                    className="w-full h-64 object-cover rounded-xl shadow-md"
                                    src={campaign.filename[0]}
                                    alt={campaign.namaGalangDana}
                                />
                                <h1 className="font-bold text-2xl mt-6 text-gray-800">{campaign.namaGalangDana}</h1>
                                <p className="text-gray-600 mt-2">{campaign.deskripsi}</p>
                            </div>

                            {/* Right Column: Donation Form */}
                            <div className="md:w-1/2">
                                <h2 className="text-xl font-semibold text-[#45c517] mb-6">Pilih Nominal Donasi</h2>
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {['10000', '20000', '50000', '100000'].map((amount) => (
                                        <button
                                            key={amount}
                                            className={`border-2 border-[#45c517] font-bold py-3 rounded-lg text-center transition-all duration-300 ${selectedAmount === amount
                                                ? 'bg-[#45c517] text-white shadow-md'
                                                : 'text-green-600 hover:bg-green-50'
                                                }`}
                                            onClick={() => handleNominalClick(amount)}
                                        >
                                            Rp{formatNumber(amount)}
                                        </button>
                                    ))}
                                </div>

                                <h3 className="text-lg font-medium text-gray-700 mb-3">
                                    Atau Masukkan Nominal Donasi Pilihanmu
                                </h3>
                                <div className="relative mb-8">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 text-lg">Rp</span>
                                    <input
                                        type="text"
                                        placeholder="0"
                                        value={donationAmount}
                                        onChange={handleInputChange}
                                        className="pl-10 border-2 border-green-500 w-full rounded-lg py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300 text-lg"
                                    />
                                </div>

                                <Link
                                    to={`/payment-charity/${id}`}
                                    state={{ total: parseInt(donationAmount.replace(/\./g, '')),idPenggalangan:id }}
                                    className="block"
                                >
                                    <button
                                        className={`${donationAmount
                                            ? 'bg-[#45c517] text-white hover:bg-green-600'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            } font-bold py-4 rounded-lg w-full text-center transition duration-300 text-lg shadow-md hover:shadow-lg`}
                                        disabled={!donationAmount}
                                    >
                                        Pilih Metode Pembayaran
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default CharityTransaction;
