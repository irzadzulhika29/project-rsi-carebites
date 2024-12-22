import axios from "axios";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import { useRef, useState, useEffect } from 'react';

const EditProfil = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef(null);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        nama_user: "",
        email: "",
        no_telp_user: "",
        password: "",
        alamat: "",
        deskripsi: "",
        no_rek: "",
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user')); // Fetch user data from localStorage
        
        if (storedUser) {
            setUser(storedUser);
            console.log(storedUser);
            
            setFormData({
                nama_user: storedUser.nama_user,
                email: storedUser.email,
                no_telp_user: storedUser.no_telp_user,
                password: '', 
                alamat: storedUser.alamat,
                deskripsi: storedUser.deskripsi,
                no_rek: storedUser.no_rek,
            });
            setProfileImage(storedUser.avatar || '../../../../public/profile.png'); 
        }
    }, []);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const updateUser = async (userId, data) => {
        try {          
          const formDataToSubmit = new FormData();
      
          // Append data to FormData
          formDataToSubmit.append('nama_user', data.nama_user);
          formDataToSubmit.append('email', data.email);
          formDataToSubmit.append('no_telp_user', data.no_telp_user);              
          formDataToSubmit.append('password', data.password); // Add password if necessary
          formDataToSubmit.append('alamat', data.alamat);
          formDataToSubmit.append('deskripsi', data.deskripsi);
          formDataToSubmit.append('no_rek', data.no_rek);
          if (avatar) {
            formDataToSubmit.append('files', avatar); // If there's a profile image, append it
          }
          
          setIsSaving(true);
          // Make the PUT request with formData
          const response = await axios.put(`http://localhost:8085/user/${userId}`, formDataToSubmit, {
            headers: {
                "Content-Type": "multipart/form-data", // Important for file uploads
              },
          });
          setIsSaving(false);
          alert('User updated successfully');
          localStorage.setItem("user", JSON.stringify(response.data));
          sessionStorage.setItem("user", JSON.stringify(response.data));
          window.location.reload();
          // Handle response
          console.log('User updated successfully:', response.data);
        } catch (error) {
          console.error('Error updating user:', error.response ? error.response.data : error.message);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];    
        setAvatar(file);
        if (file) {
            setIsLoading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result); // Set the new profile image
                setIsLoading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeletePhoto = () => {
        setProfileImage(user?.avatar || '../../../../public/profile.png'); // Reset to the original image from localStorage
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    if (!user) {
        return <div>Loading...</div>; // Show loading state while user data is being fetched
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar will always be fixed on the left */}
            <Sidebar />

            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <Navbar />

                    <section className="min-h-screen mx-10 mt-5 mb-5 ">

                        <h1 className=" text-2xl font-bold text-[#45c517]">
                            Edit Profil
                        </h1>
                        <section className="w-full bg-white rounded-xl p-6 mt-5 shadow-md">
                            <div>
                                <h1 className="text-xl font-semibold text-gray-800 mb-4">Foto Profil</h1>
                                <div className="flex items-center gap-5">
                                    <div className="relative">
                                        <img
                                            className="rounded-full w-24 h-24 object-cover border-2 border-[#45c517]"
                                            src={profileImage || '../../../../public/profile.png'} // Fallback to default image
                                            alt="Profile"
                                        />
                                        {isLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <button
                                            onClick={handleUploadClick}
                                            className="rounded-full text-white px-4 py-2 bg-[#45c517] text-xs font-semibold hover:bg-green-600 transition duration-300"
                                        >
                                            Upload Foto
                                        </button>
                                        <button
                                            onClick={handleDeletePhoto}
                                            className="rounded-full text-[#45c517] px-4 py-2 bg-white border border-[#45c517] text-xs font-semibold hover:bg-red-50 transition duration-300"
                                        >
                                            Hapus Foto
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <form className="mt-5" onSubmit={(e) => { e.preventDefault(); updateUser(user.id, formData); }}>

                                <div className="flex flex-col gap-3 py-3 border-t border-b border-gray-200">
                                    <label className="font-semibold text-sm text-gray-700" htmlFor="username">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <input
                                            value={formData.nama_user}
                                            id="username"
                                            name="nama_user"
                                            type="text"
                                            onChange={handleChange}
                                            className="w-full px-4 py-1 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 py-3 border-t border-b border-gray-200">
                                    <label className="text-sm font-semibold text-gray-700" htmlFor="email">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            value={formData.email}
                                            id="email"
                                            name="email"
                                            type="email"
                                            onChange={handleChange}
                                            className="w-full px-4 py-1 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 py-3 border-t border-b border-gray-200">
                                    <label className="text-sm font-semibold text-gray-700" htmlFor="alamat">
                                        Alamat
                                    </label>
                                    <div className="relative">
                                        <input
                                            value={formData.alamat}
                                            id="alamat"
                                            name="alamat"
                                            type="text"
                                            placeholder="Masukkan alamat lengkap"
                                            onChange={handleChange}
                                            className="w-full px-4 py-1 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 py-3 border-t border-b border-gray-200">
                                    <label className="text-sm font-semibold text-gray-700" htmlFor="no_rek">
                                        Nomor Rekening
                                    </label>
                                    <div className="relative">
                                        <input
                                            value={formData.no_rek}
                                            id="no_rek"
                                            name="no_rek"
                                            type="text"
                                            placeholder="Masukkan nomor rekening"
                                            onChange={handleChange}
                                            className="w-full px-4 py-1 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 py-3 border-t border-b border-gray-200">
                                    <label className="text-sm font-semibold text-gray-700" htmlFor="password">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            value={formData.password}
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="password"
                                            onChange={handleChange}
                                            className="w-full px-4 py-1 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />   
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>                                     
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 py-3 border-t border-b border-gray-200">
                                    <label className="text-sm font-semibold text-gray-700" htmlFor="deskripsi">
                                        Deskripsi
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            value={formData.deskripsi}
                                            id="deskripsi"
                                            name="deskripsi"
                                            placeholder="Masukkan deskripsi singkat tentang diri Anda"
                                            onChange={handleChange}
                                            rows="4"
                                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full mt-5 py-2 rounded-lg bg-[#45c517] text-white font-semibold hover:bg-green-600 transition duration-300"
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Menunggu...' : 'Simpan Perubahan'}
                                </button>
                            </form>
                        </section>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default EditProfil;
