import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SidebarLS from '../../../components/dashboard/lembagasosial/SidebarLS';
import NavbarLS from '../../../components/dashboard/lembagasosial/NavbarLS';
import { useState, useEffect } from 'react';

const UpdateCharityLS = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the campaign ID from the URL
    const [image, setImage] = useState(null);
    const [campaignData, setCampaignData] = useState({
        namaGalangDana: '',
        deskripsi: '',
        target: '',
        lokasi: '',
        kategori: '',
        status: '',
        tanggalMulai: '',
        tanggalAkhir: '',
        filename: '',
    });

    useEffect(() => {
        // Fetch the campaign data when the component mounts
        const fetchCampaignData = async () => {
            try {
                const response = await axios.get(`http://localhost:8085/penggalangan/${id}`);
                const formattedStartDate = new Date(response.data.tanggalMulai).toISOString().split('T')[0];  // YYYY-MM-DD
                const formattedEndDate = new Date(response.data.tanggalAkhir).toISOString().split('T')[0];  // YYYY-MM-DD                

                setCampaignData({
                    namaGalangDana: response.data.namaGalangDana,
                    deskripsi: response.data.deskripsi,
                    target: response.data.target,
                    lokasi: response.data.lokasi,
                    kategori: response.data.kategori,
                    status: response.data.status,
                    tanggalMulai: formattedStartDate,
                    tanggalAkhir: formattedEndDate,
                    filename: response.data.filename[0]
                });
                
            } catch (error) {
                console.error('Error fetching campaign data:', error);
            }
        };

        fetchCampaignData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCampaignData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setImage(null);
    };

    const handleSubmit = async (e) => {
        const userData = JSON.parse(sessionStorage.getItem('user')) || {};
        e.preventDefault();

        // Create FormData to send data with file
        const formData = new FormData();
        formData.append('namaGalangDana', campaignData.namaGalangDana);
        formData.append('deskripsi', campaignData.deskripsi);
        formData.append('target', campaignData.target);
        formData.append('lokasi', campaignData.lokasi);
        formData.append('kategori', campaignData.kategori);
        formData.append('status', campaignData.status);
        formData.append('tanggalMulai', campaignData.tanggalMulai);
        formData.append('tanggalAkhir', campaignData.tanggalAkhir);
        formData.append('id_user', userData.id);

        // Adding the image if available
        if (image) {
            const blob = dataURItoBlob(image);
            const blobName = blob.name || `${campaignData.tanggalMulai}_${campaignData.namaGalangDana}_campaign-image.jpg`;
            formData.append('files', blob, blobName);
        }

        try {
            const response = await axios.put(`http://localhost:8085/penggalangan/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Campaign updated successfully');
            navigate('/charitycampaign-ls'); // Redirect after success
        } catch (error) {
            console.error('Error updating campaign:', error);
        }
    };

    // Function to convert Data URL (base64) to Blob
    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ua = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ua[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    return (
        <div className="flex min-h-screen">
            <SidebarLS />
            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <NavbarLS />
                    <div className="mt-5 mx-10">
                        <h1 className="text-[#45c517] text-2xl font-bold">Update Charity Campaign</h1>

                        <section className="p-6 rounded-md bg-white shadow-md mt-5">
                            <h1 className="mb-5 text-xl font-semibold text-[#45c517]">Campaign Information</h1>
                            <form className="space-y-6" onSubmit={handleSubmit}>

                                {/* Photo Upload Section */}
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Campaign Photo</label>
                                    <div className="mt-2">
                                        {image ? (
                                            <div className="relative w-full">
                                                <img
                                                    src={image}
                                                    alt="Campaign Preview"
                                                    className="w-full h-72 object-cover rounded-lg border border-gray-200"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleDeleteImage}
                                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ) : (
                                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                    <div className="relative w-full">
                                                        <img
                                                            src={campaignData.filename}
                                                            alt="Campaign Preview"
                                                            className="w-full h-72 object-cover rounded-lg border border-gray-200"
                                                        />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleFileChange}
                                                            className="hidden"
                                                        />
                                                    </div>
                                                </label>
                                        )}
                                    </div>
                                </div>

                                {/* Grid untuk input fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Nama Campaign</label>
                                        <input
                                            type="text"
                                            name="namaGalangDana"
                                            value={campaignData.namaGalangDana}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                            placeholder="Masukkan nama campaign"
                                        />
                                        <h2 id="namaGalangDanaError" className="text-red-500 text-sm mt-1"></h2>
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Target Dana</label>
                                        <input
                                            type="text"
                                            name="target"
                                            value={campaignData.target}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                            placeholder="Masukkan target dana"
                                        />
                                        <h2 id="targetError" className="text-red-500 text-sm mt-1"></h2>
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Deskripsi Campaign</label>
                                    <textarea
                                        name="deskripsi"
                                        value={campaignData.deskripsi}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                        placeholder="Masukkan deskripsi campaign"
                                    ></textarea>
                                    <h2 id="deskripsiError" className="text-red-500 text-sm mt-1"></h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Kategori</label>
                                        <select
                                            name="kategori"
                                            value={campaignData.kategori}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                        >
                                            <option value="">Pilih Kategori</option>
                                            <option value="Pendidikan">Pendidikan</option>
                                            <option value="Kesehatan">Kesehatan</option>
                                            <option value="Bencana Alam">Bencana Alam</option>
                                            <option value="Sosial">Sosial</option>
                                        </select>
                                        <h2 id="kategoriError" className="text-red-500 text-sm mt-1"></h2>
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Status</label>
                                        <select
                                            name="status"
                                            value={campaignData.status}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                        >
                                            <option value="">Pilih Status</option>
                                            <option value="active">Aktif</option>
                                            <option value="inactive">Tidak Aktif</option>
                                        </select>
                                        <h2 id="statusError" className="text-red-500 text-sm mt-1"></h2>
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Lokasi</label>
                                    <input
                                        type="text"
                                        name="lokasi"
                                        value={campaignData.lokasi}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                        placeholder="Masukkan lokasi campaign"
                                    />
                                    <h2 id="lokasiError" className="text-red-500 text-sm mt-1"></h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Tanggal Mulai</label>
                                        <input
                                            type="date"
                                            name="tanggalMulai"
                                            value={campaignData.tanggalMulai}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                        />
                                        <h2 id="tanggalMulaiError" className="text-red-500 text-sm mt-1"></h2>
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Tanggal Berakhir</label>
                                        <input
                                            type="date"
                                            name="tanggalAkhir"
                                            value={campaignData.tanggalAkhir}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                        />
                                        <h2 id="tanggalAkhirError" className="text-red-500 text-sm mt-1"></h2>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 text-white bg-[#45c517] rounded-full hover:bg-[#3ba513] focus:outline-none focus:ring-2 focus:ring-[#45c517] focus:ring-offset-2 transition-colors duration-200"
                                    >
                                        Update Campaign
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UpdateCharityLS;
