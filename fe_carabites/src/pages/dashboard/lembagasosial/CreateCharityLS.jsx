
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SidebarLS from '../../../components/dashboard/lembagasosial/SidebarLS';
import NavbarLS from '../../../components/dashboard/lembagasosial/NavbarLS';
import { useState } from 'react';

const CreateCharityLS = () => {
    const navigate = useNavigate();    
    const [image, setImage] = useState(null);
    const [campaignData, setCampaignData] = useState({
        campaign_title: '',
        description: '',
        target: '',
        location: '',
        category: '',
        status: '',
        start_date: '',
        end_date: '',
    });

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
        // Membuat FormData untuk mengirim data dengan file
        const formData = new FormData();
        formData.append('namaGalangDana', campaignData.campaign_title);
        formData.append('deskripsi', campaignData.description);
        formData.append('target', campaignData.target);
        formData.append('lokasi', campaignData.location);
        formData.append('kategori', campaignData.category);
        formData.append('status', campaignData.status);
        formData.append('tanggalMulai', campaignData.start_date);
        formData.append('tanggalAkhir', campaignData.end_date);
        formData.append('id_user', userData.id);

        // Menambahkan gambar jika ada
        if (image) {
            const blob = dataURItoBlob(image);
            const blobName = blob.name || `${campaignData.start_date}_${campaignData.campaign_title}_campaign-image.jpg`
            formData.append('files', blob, blobName);
        }

        try {
            const response = await axios.post('http://localhost:8085/penggalangan', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Form submitted successfully');
            navigate('/charitycampaign-ls');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    // Fungsi untuk mengonversi Data URL (base64) menjadi Blob
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
                        <h1 className="text-[#45c517] text-2xl font-bold">Buat Charity Campaign</h1>

                        <section className="p-6 rounded-md bg-white shadow-md mt-5">
                            <h1 className="mb-5 text-xl font-semibold text-[#45c517]">Informasi Campaign</h1>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                              
                                {/* Foto Campaign */}
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Foto Campaign</label>
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
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-10 h-10 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Klik untuk upload</span></p>
                                                    <p className="text-xs text-gray-500">PNG, JPG (MAX. 1920x1080px)</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                        <h2 id="imageError" className="text-red-500 text-sm mt-1"></h2>
                                    </div>
                                </div>

                                {/* Grid untuk input fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Nama Campaign</label>
                                        <input
                                            type="text"
                                            name="campaign_title"
                                            value={campaignData.campaign_title}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                            placeholder="Masukkan nama campaign"
                                        />
                                        <h2 id="campaign_titleError" className="text-red-500 text-sm mt-1"></h2>
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Target Dana</label>
                                        <input
                                            type="number"
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
                                        name="description"
                                        value={campaignData.description}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                        placeholder="Masukkan deskripsi campaign"
                                    ></textarea>
                                    <h2 id="descriptionError" className="text-red-500 text-sm mt-1"></h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Kategori</label>
                                        <select
                                            name="category"
                                            value={campaignData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                        >
                                            <option value="">Pilih Kategori</option>
                                            <option value="Pendidikan">Pendidikan</option>
                                            <option value="Kesehatan">Kesehatan</option>
                                            <option value="Bencana Alam">Bencana Alam</option>
                                            <option value="Sosial">Sosial</option>
                                        </select>
                                        <h2 id="categoryError" className="text-red-500 text-sm mt-1"></h2>
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
                                        name="location"
                                        value={campaignData.location}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                        placeholder="Masukkan lokasi campaign"
                                    />
                                    <h2 id="locationError" className="text-red-500 text-sm mt-1"></h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Tanggal Mulai</label>
                                        <input
                                            type="date"
                                            name="start_date"
                                            value={campaignData.start_date}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                        />
                                        <h2 id="start_dateError" className="text-red-500 text-sm mt-1"></h2>
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium text-gray-700">Tanggal Berakhir</label>
                                        <input
                                            type="date"
                                            name="end_date"
                                            value={campaignData.end_date}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                        />
                                        <h2 id="end_dateError" className="text-red-500 text-sm mt-1"></h2>
                                    </div>
                                </div>

                                {/* Tombol Submit */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 text-white bg-[#45c517] rounded-full hover:bg-[#3ba513] focus:outline-none focus:ring-2 focus:ring-[#45c517] focus:ring-offset-2 transition-colors duration-200"
                                    >
                                        Buat Campaign
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

export default CreateCharityLS;
