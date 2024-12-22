import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Navbar from '../../dashboard/Navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const formatPrice = (price) => `Rp ${Number(price).toLocaleString('id-ID')}`;

const CharityCampaignDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();  
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  useEffect(() => {    
    const fetchCampaignData = async () => {
      try {
        const response = await axios.get(`http://localhost:8085/penggalangan/${id}`);
        console.log("Response dari API:", response.data); // Debugging untuk memeriksa data
        setCampaign(response.data);
      } catch (error) {
        console.error('Error fetching campaign data:', error);
      } finally {
        setLoading(false); // Pastikan loading selesai
      }
    };

    fetchCampaignData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Tampilkan loading jika data belum tersedia
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
          <div className="mt-10 mx-10">
            <div className="bg-white shadow-md rounded-xl p-5 mb-5 flex flex-col md:flex-row gap-6">
              <img
                src={campaign?.filename?.[0]}
                alt="Campaign"
                className="w-full md:w-1/2 h-64 object-cover rounded-md"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    className="w-10 h-10 object-cover rounded-full"
                    src={campaign.user?.avatar}
                    alt={campaign.user?.nama_user}
                  />
                  <div>
                    <p className="font-semibold">{campaign.user?.nama_user}</p>
                    <p className="text-sm text-gray-600">{campaign.lokasi}</p>
                  </div>
                </div>
                <h1 className="text-2xl font-bold mb-4">{campaign.namaGalangDana}</h1>
                <div>
                  <h3 className="text-lg font-bold">Terkumpul</h3>
                  <p className="text-sm mb-2">
                    {formatPrice(campaign.target)} dari {formatPrice(campaign.target)}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-[#45c517] h-2.5 rounded-full"
                      style={{ width: `${(campaign.target / campaign.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <button
                  className="bg-[#45c517] text-white w-full p-2 hover:bg-green-600 rounded-full transition duration-300"
                  onClick={() => navigate(`/charity-transaction/${campaign._id}`)}
                >
                  Donasi Sekarang
                </button>
              </div>
            </div>
            <section className="bg-white shadow-md rounded-xl p-5">
              <h1 className="text-xl font-semibold text-[#45c517] border-b pb-2 border-[#45c517] mb-4">Informasi Campaign</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 className="font-semibold">Deskripsi Campaign</h2>
                  <p className="text-sm">{campaign.deskripsi}</p>
                </div>
                <div>
                  <h2 className="font-semibold">Kategori Campaign</h2>
                  <p className="text-sm">{campaign.kategori}</p>
                </div>
                <div>
                  <h2 className="font-semibold">Target Campaign</h2>
                  <p className="text-sm">{formatPrice(campaign.target)}</p>
                </div>
                <div>
                  <h2 className="font-semibold">Durasi Campaign</h2>
                  <p className="text-sm">Mulai: {campaign.tanggalMulai}</p>
                  <p className="text-sm">Selesai: {campaign.tanggalAkhir}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CharityCampaignDetail;
