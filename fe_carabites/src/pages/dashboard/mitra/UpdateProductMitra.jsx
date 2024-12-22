
import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import SidebarMitra from "../../../components/dashboard/mitra/SidebarMitra";
import NavbarMitra from "../../../components/dashboard/mitra/NavbarMitra";
import kotaData from "../../../assets/sharemeals/kotaData.json";
import categoryList from '../../../../public/categoryList.json';  // Adjust path as needed
import axios from "axios";
import moment from "moment";


const UpdateShareMeals = () => {
    // 1. State Declarations
    const [formData, setFormData] = useState({
        nama_produk: "",
        deskripsi_produk: "",
        jumlah_produk: 0,
        harga: "",
        images: Array(5).fill(null),
        category: "",
        kota: "",
        kecamatan: "",
        kelurahan: "",
        alamat: "",
        date: "",
        time: ""
    });
    const [categoriesData, setCategoriesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [error, setError] = useState(null);
    const [images, setImages] = useState((null));
    const [saveImages, setSaveImages] = useState([]);

    // 2. Hooks
    const navigate = useNavigate();
    const { id } = useParams();


    // 3. Derived State
    const kecamatanData = kotaData[formData.kota] ?? {};
    const kelurahanData = kecamatanData[formData.kecamatan] ?? [];


    // 4. Utility Functions
    const formatTimeForInput = (timeString) => {
        if (!timeString) return '';
        return timeString.replace('.', ':');
    };


    const formatTimeForDisplay = (timeString) => {
        if (!timeString) return '';
        return timeString.replace(':', '.');
    };


    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`;
    };


    const formatDateForDisplay = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };


    // 5. Effects
    useEffect(() => {
        try {
            setIsLoading(true);
            setCategoriesData(categoryList);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);


    useEffect(() => {
        const loadProduct = async () => {
            try {
                const list = await axios.get(`http://localhost:8085/produk/${id}`);
                if (!list) throw new Error("Produk tidak ditemukan");
                const product = list.data                                            


                setFormData({
                    ...formData,
                    nama_produk: product.nama_produk ?? "",
                    deskripsi_produk: product.deskripsi_produk ?? "",
                    jumlah_produk: product.jumlah_produk ?? 0,
                    harga: product.harga?.toString() ?? "",
                    images: [...(product.filename || []), ...Array(5 - (product.filename?.length || 0)).fill(null)].slice(0, 5),
                    category: product.kategori_produk ?? "",
                    kategori_produk:product.kategori_produk ?? "",
                    kota : product.kota ,
                    kecamatan : product.kecamatan,
                    kelurahan : product.kelurahan,
                    alamat : product.alamat,
                    tanggal_pengambilan:  moment(product.tanggal_pengambilan).format('DD-MM-YYYY')  ?? "",                                        
                    jam: formatTimeForDisplay(product.jam) ?? "",
                });
                                
            } catch (err) {
                setErrorMessage(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadProduct();
        console.log(formData);
        
    }, [id]);


    // 6. Event Handlers
    const updateField = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };


    const handleFileChange = (e, index) => {
        const files = Array.from(e.target.files); 
      
        setSaveImages((prevImages) => {
          return [...prevImages, ...files]; 
        });     
                
        
        if (files && files.length > 0) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormData((prevFormData) => {             
                const updatedImages = [...(prevFormData.images || [])]; 
                console.log(updatedImages);
                
                // Perbarui gambar sesuai dengan indeks
                updatedImages[index] = reader.result;

                setImages(updatedImages); // Update state images
            
                return {
                    ...prevFormData,
                    images: updatedImages, 
                };                
                
            });
        };
          reader.readAsDataURL(files[0]); 
        }
      };
      
      const handleDeleteImage = (index) => {                
        // Salin array gambar dari formData
        setFormData((prevFormData) => {             
            const updatedImages = [...(prevFormData.images || [])]; 
            
            // Ganti gambar pada indeks dengan null
            updatedImages[index] = null;
    
            return {
              ...prevFormData,
              images: updatedImages, // Perbarui array images
            };
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const requiredFields = ['nama_produk', 'deskripsi_produk', 'harga', 'category'];
        const missingFields = requiredFields.some(field => !formData[field]);
    
        if (missingFields || !formData.alamat || !formData.tanggal_pengambilan || !formData.jam) {
            alert("Mohon lengkapi semua data yang diperlukan.");
            return;
        }
    
        try {                            
            const formDataToSend = new FormData();

            // Menambahkan data lainnya terlebih dahulu
            formDataToSend.append("id", id);
            formDataToSend.append("nama_produk", formData.nama_produk);
            formDataToSend.append("deskripsi_produk", formData.deskripsi_produk);
            formDataToSend.append("jumlah_produk", formData.jumlah_produk);
            formDataToSend.append("harga", formData.harga);
            formDataToSend.append("kategori_produk", formData.category);
            formDataToSend.append("kota", formData.kota);
            formDataToSend.append("kecamatan", formData.kecamatan);
            formDataToSend.append("kelurahan", formData.kelurahan);
            formDataToSend.append("alamat", formData.alamat);
            formDataToSend.append("tanggal_pengambilan", formData.tanggal_pengambilan);
            formDataToSend.append("jam", formData.jam);
            formDataToSend.append("updated_at", new Date().toISOString());

            // Menambahkan gambar-gambar yang sudah ada (dari filename)
            if (formData.images && formData.images.length > 0 && formData.images != null) {
                for (let i = 0; i < formData.images.length; i++) {
                    const imageUrl = formData.images[i];
                    
                    
                    if (imageUrl != null) {                        
                        const response = await fetch(imageUrl);
                        const blob = await response.blob();
                        const file = new File([blob], `existing-image-${i}`, { type: blob.type });
    
                        
                        formDataToSend.append("files", file);
                    }                    
                }
            }
        
            // Menambahkan gambar-gambar
            if (saveImages && saveImages.length > 0) {
                for (let i = 0; i < saveImages.length; i++) {
                    console.log(saveImages[i]);
                    formDataToSend.append("files", saveImages[i]); // Menambahkan gambar ke FormData
                }
            }
    
            console.log('Updating product:', formDataToSend);
    
            // Make the API request to update the product
            const response = await axios.put(`http://localhost:8085/produk/${id}`, formDataToSend, {
                headers: {
                  "Content-Type": "multipart/form-data", // Important for file uploads
                },
              });           
            
            alert("Produk berhasil diperbarui!");
            navigate("/sharemeals-mitra");
        } catch (err) {
            console.error('Error updating product:', err);
            alert("Gagal memperbarui produk. Silakan coba lagi.");
        }
    };
    // 7. Render Conditions
    if (isLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (errorMessage) return <div className="flex justify-center items-center min-h-screen text-red-500">{errorMessage}</div>;
    return (
        <div className="flex min-h-screen">
            <SidebarMitra />
            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <NavbarMitra />
                    <div className="mt-10 mx-10">
                     


                        <section className="p-3 rounded-md bg-white shadow-md mt-5">
                            <h1 className="mb-5 text-xl font-semibold text-[#45c517]">Informasi Produk dan Pengambilan</h1>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Foto Produk */}
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Foto Produk</label>
                                    <div className="mt-2">
                                        {formData.images[0] ? (
                                            <div className="relative w-48 h-48 border-2 border-gray-200 rounded-md">
                                                <img
                                                    src={formData.images[0]}
                                                    alt="Foto Produk"
                                                    className="w-full h-full object-cover rounded-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newImages = [...formData.images];
                                                        newImages[0] = null;
                                                        updateField('images', newImages);
                                                    }}
                                                    onChange={(e) => handleFileChange(e,0)}
                                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="flex flex-col items-center justify-center w-48 h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Klik untuk upload</span></p>
                                                    <p className="text-xs text-gray-500">PNG, JPG (MAX. 800x400px)</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e,0)}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                {/* Nama Produk */}
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Nama Produk</label>
                                    <div className="relative">
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                            type="text"
                                            value={formData.nama_produk}
                                            onChange={(e) => {
                                                if (e.target.value.length <= 23) {
                                                    updateField('nama_produk', e.target.value);
                                                }
                                            }}
                                            maxLength={23}
                                            placeholder="Masukkan nama produk"
                                            required
                                        />
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                                            {formData.nama_produk.length}/23
                                        </span>
                                    </div>
                                </div>

                                {/* Deskripsi Produk */}
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Deskripsi Produk</label>
                                    <textarea
                                        placeholder="Deskripsi produk"
                                        className="rounded-2xl pl-3 border-2 border-green-300 p-1 mt-2"
                                        rows="5"
                                        value={formData.deskripsi_produk}
                                        onChange={(e) => updateField('deskripsi_produk', e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                {/* Harga Produk */}
                                <div className="flex flex-col">
                                    <label>Harga Produk</label>
                                    <input
                                        className="rounded-2xl pl-3 border-2 border-green-300 p-1 mt-2"
                                        type="number"
                                        value={formData.harga}
                                        onChange={(e) => updateField('harga', e.target.value)}
                                        placeholder="Masukkan harga produk"
                                        required
                                    />
                                </div>                                

                                {/* Kategori */}
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Kategori</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                        value={formData.category || ''}
                                        onChange={(e) => updateField('category', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {isLoading ? (
                                            <option>Loading...</option>
                                        ) : error ? (
                                            <option>Error: {error}</option>
                                        ) : (
                                            categoriesData.map((categoryItem) => (
                                                <option
                                                    key={categoryItem?.id}
                                                    value={categoryItem?.name}
                                                >
                                                    {categoryItem?.name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>

                                {/* Lokasi Pengambilan */}
                                <div className="space-y-6">
                                    <h2 className="text-lg font-medium text-gray-700">Lokasi Pengambilan</h2>

                                    {/* Grid untuk Kota, Kecamatan, dan Kelurahan */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Kota */}
                                        <div>
                                            <label className="block mb-2 font-medium text-gray-700">Kota</label>
                                            <select
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                                value={formData.kota}
                                                onChange={(e) => {
                                                    updateField('kota', e.target.value);
                                                    updateField('kecamatan', '');
                                                    updateField('kelurahan', '');
                                                }}
                                                required
                                            >
                                                <option value="">Pilih Kota</option>
                                                {Object.keys(kotaData).map((kota, index) => (
                                                    <option key={index} value={kota}>
                                                        {kota}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Kecamatan */}
                                        <div>
                                            <label className="block mb-2 font-medium text-gray-700">Kecamatan</label>
                                            <select
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                                value={formData.kecamatan}
                                                onChange={(e) => {
                                                    updateField('kecamatan', e.target.value);
                                                    updateField('kelurahan', '');
                                                }}
                                                required
                                                disabled={!formData.kota}
                                            >
                                                <option value="">Pilih Kecamatan</option>
                                                {Object.keys(kecamatanData).map((kecamatan, index) => (
                                                    <option key={index} value={kecamatan}>
                                                        {kecamatan}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Kelurahan */}
                                        <div>
                                            <label className="block mb-2 font-medium text-gray-700">Kelurahan</label>
                                            <select
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#45c517] focus:border-[#45c517]"
                                                value={formData.kelurahan}
                                                onChange={(e) => updateField('kelurahan', e.target.value)}
                                                required
                                                disabled={!formData.kecamatan}
                                            >
                                                <option value="">Pilih Kelurahan</option>
                                                {kelurahanData.map((kelurahan, index) => (
                                                    <option key={index} value={kelurahan}>
                                                        {kelurahan}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                <div className="flex flex-col">
                                    <label>Alamat Lengkap</label>
                                    <input
                                        className="rounded-2xl pl-3 border-2 border-green-300 p-1 mt-2"
                                        type="text"
                                        value={formData.alamat}
                                        onChange={(e) => updateField('alamat', e.target.value)}
                                        placeholder="Alamat Lengkap"
                                        required
                                    />
                                </div>

                                {/* Pickup Fields */}
                                <div className="flex flex-col">
                                    <label>Tanggal Pengambilan</label>
                                    <input
                                        className="rounded-2xl pl-3 border-2 border-green-300 p-1 mt-2"
                                        type="date"
                                        value={formatDateForInput(formData.tanggal_pengambilan)}
                                        onChange={(e) => updateField('tanggal_pengambilan', formatDateForDisplay(e.target.value))}
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label>Jam Pengambilan</label>
                                    <input
                                        className="rounded-2xl pl-3 border-2 border-green-300 p-1 mt-2"
                                        type="time"
                                        value={formatTimeForInput(formData.jam)}
                                        onChange={(e) => updateField('jam', formatTimeForDisplay(e.target.value))}
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-[#45c517] text-white rounded-lg hover:bg-[#3ba513] focus:outline-none focus:ring-2 focus:ring-[#45c517] focus:ring-opacity-50"
                                    >
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </div>
                            </form>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
};


export default UpdateShareMeals

