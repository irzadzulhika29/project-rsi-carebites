import SidebarMitra from '../../components/dashboard/mitra/SidebarMitra';
import NavbarMitra from '../../components/dashboard/mitra/NavbarMitra';
import { useState } from 'react';

const AccountVerifForm = () => {
    const [formData, setFormData] = useState({
        namaPerusahaan: '',
        alamatPerusahaan: '',
        deskripsiPerusahaan: '',
        fotoKantor: null,
        suratIzin: null,
        nomorRekening: '',
        namaPemilikRekening: '',
        location: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        setFormData(prevData => ({
            ...prevData,
            [name]: file
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <div className="flex min-h-screen">
            <SidebarMitra />

            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <NavbarMitra showSearchBar={true} />

                    <h1 className="mt-5 mx-10 text-2xl font-bold text-[#45c517]">Verifikasi Akun</h1>

                    <div className="mt-5 mx-10 p-6 bg-white shadow-md rounded-md">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Nama Pemilik Lembaga/Mitra</label>
                                <input
                                    type="text"
                                    name="namaPemilikRekening"
                                    value={formData.namaPemilikRekening}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-[#45c517] rounded-md focus:outline-none focus:ring-2 focus:ring-[#45c517]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Nama Lembaga/Mitra</label>
                                <input
                                    type="text"
                                    name="namaPerusahaan"
                                    value={formData.namaPerusahaan}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-[#45c517] rounded-md focus:outline-none focus:ring-2 focus:ring-[#45c517]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Lokasi Lembaga/Mitra</label>
                                <input
                                    type="text"
                                    name="alamatPerusahaan"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-[#45c517] rounded-md focus:outline-none focus:ring-2 focus:ring-[#45c517]"
                                    required
                                    placeholder='Contoh : Jakarta, Indonesia'
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Alamat Lembaga/Mitra</label>
                                <input
                                    type="text"
                                    name="alamatPerusahaan"
                                    value={formData.alamatPerusahaan}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-[#45c517] rounded-md focus:outline-none focus:ring-2 focus:ring-[#45c517]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Deskripsi Lembaga/Mitra</label>
                                <textarea
                                    name="deskripsiPerusahaan"
                                    value={formData.deskripsiPerusahaan}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-[#45c517] rounded-md focus:outline-none focus:ring-2 focus:ring-[#45c517]"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Foto Lembaga/Mitra</label>
                                <input
                                    type="file"
                                    name="fotoKantor"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full mt-1 p-2 border border-[#45c517] rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Dokumen Lembaga/Mitra</label>
                                <input
                                    type="file"
                                    name="suratIzin"
                                    accept="image/*,application/pdf"
                                    onChange={handleFileChange}
                                    className="w-full mt-1 p-2 border border-[#45c517] rounded-md"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Nomor Rekening Lembaga/Mitra</label>
                                <input
                                    type="text"
                                    name="nomorRekening"
                                    value={formData.nomorRekening}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border border-[#45c517] rounded-md focus:outline-none focus:ring-2 focus:ring-[#45c517]"
                                    required
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-[#45c517] text-white rounded-full hover:bg-green-600 transition-colors"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AccountVerifForm;