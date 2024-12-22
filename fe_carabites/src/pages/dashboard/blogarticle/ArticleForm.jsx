import { useState } from 'react';
import Navbar from '../../../components/dashboard/Navbar';
import Sidebar from '../../../components/dashboard/Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ArticleForm = () => {    
    const user = JSON.parse(localStorage.getItem('user'));         
    const navigate = useNavigate();
    const [showPreview, setShowPreview] = useState(false);
    const [previewData, setPreviewData] = useState(null);


    const categories = [
        'Technology',
        'Health',
        'Business',
        'Lifestyle',
        'Education'
    ];

    // Add preview update function
    const updatePreview = (form) => {
        const previewTitle = document.getElementById('previewTitle');
        const previewContent = document.getElementById('previewContent');
        const previewCategory = document.getElementById('previewCategory');

        if (previewTitle) previewTitle.textContent = form.title.value || 'Judul Artikel';
        if (previewContent) previewContent.textContent = form.content.value || 'Konten artikel akan ditampilkan di sini...';
        if (previewCategory) previewCategory.textContent = form.category.value || 'Kategori';
    };


    const handleInputChange = (e) => {
        clearError(e.target);
        updatePreview(e.target.form);
    };

    // Update the showSuccess function
    const showSuccess = (message) => {
        const successMessage = document.getElementById('successMessage');
        successMessage.textContent = message;
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const previewElement = document.getElementById('imagePreview');

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                previewElement.innerHTML = `
                    <img src="${reader.result}" 
                         alt="Preview" 
                         class="max-w-[200px] h-auto rounded-md"
                    />`;
            };
            reader.readAsDataURL(file);
        } else {
            previewElement.innerHTML = '';
        }
    };

    const clearError = (element) => {
        const errorElement = document.getElementById(`${element.name}Error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    };

    const validateForm = (formElement) => {
        const title = formElement.title.value;
        const content = formElement.content.value;
        const category = formElement.category.value;
        const imageFile = formElement.image.files[0];
        let isValid = true;

        if (!title.trim()) {
            document.getElementById('titleError').textContent = 'Judul harus diisi';
            isValid = false;
        }
        if (!content.trim()) {
            document.getElementById('contentError').textContent = 'Konten harus diisi';
            isValid = false;
        }
        if (!category) {
            document.getElementById('categoryError').textContent = 'Kategori harus dipilih';
            isValid = false;
        }
        if (!imageFile) {
            document.getElementById('imageError').textContent = 'Foto harus diunggah';
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const errorMessage = document.getElementById('formError');
        const imagePreview = document.getElementById('imagePreview');
    
        if (!validateForm(form)) {
            errorMessage.textContent = 'Mohon lengkapi semua field yang diperlukan';
            return;
        }
    
        submitBtn.disabled = true;
        submitBtn.textContent = 'Uploading...';
        errorMessage.textContent = '';
    
        // Get image URL from preview
        const imageUrl = imagePreview.querySelector('img')?.src || '';
    
        // Set preview data
        setPreviewData({
            title: form.title.value,
            content: form.content.value,
            category: form.category.value,
            imageUrl: imageUrl
        });
        setShowPreview(true);
    
        // Create FormData
        const formData = new FormData();
        formData.append('judul', form.title.value);
        formData.append('konten', form.content.value);
        formData.append('kategori', form.category.value);
        formData.append('id_user', user.id);
    
        // If image is uploaded, append it to FormData
        const imageFile = form.image.files[0];
        if (imageFile) {
            formData.append('files', imageFile);
        }
    
        try {
            // Send the form data to the API using Axios
            const response = await axios.post('http://localhost:8085/postingan', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            // Check if the response is successful
            if (response.status === 201) {
                // Simulate successful upload and show success message
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Upload Artikel';
                    showSuccess('Artikel berhasil diupload!');
    
                    // Delay before redirecting to the blog page
                    setTimeout(() => {
                        navigate('/blog');
                    }, 1500); // Delay 1.5 seconds before navigating
                }, 1000); // Show success message for 1 second
            } else {
                throw new Error('Failed to upload article');
            }
        } catch (error) {
            errorMessage.textContent = 'Gagal mengunggah artikel, coba lagi!';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Upload Artikel';
        }
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <section className="bg-[#f4fef1] w-full pl-60 pt-20">
                <div className="flex-grow">
                    <Navbar />
                    <h1 className="mt-5 text-[#45c517] mx-10 text-2xl font-bold">Blog & Article</h1>

                    <div className="mt-5 p-3 rounded-md bg-white mb-5 shadow-md mx-10 flex flex-row gap-8">
                        {/* Form Section */}
                        <div className="flex-1">
                            <h1 className='text-xl text-[#45c517] font-semibold'>Form Artikel</h1>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Foto Artikel</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={(e) => {
                                                handleImageChange(e);
                                                handleInputChange(e);
                                            }}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="flex items-center gap-2 px-4 py-2 border-2 border-[#45c517] text-[#45c517] rounded-md cursor-pointer hover:bg-[#45c517] hover:text-white transition-all duration-300"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                                            </svg>
                                            <span>Pilih File</span>
                                        </label>
                                    </div>
                                    <div id="imagePreview" className="mt-2"></div>
                                    <h2 id="imageError" className="text-red-500 text-sm"></h2>
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Judul Artikel</label>
                                    <input
                                        type="text"
                                        name="title"
                                        onInput={handleInputChange}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300"
                                        placeholder="Masukkan judul artikel"
                                    />
                                    <h2 id="titleError" className="text-red-500 text-sm"></h2>
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Konten Artikel</label>
                                    <textarea
                                        name="content"
                                        onInput={handleInputChange}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300 min-h-[200px] resize-y"
                                        placeholder="Tulis konten artikel"
                                    />
                                    <h2 id="contentError" className="text-red-500 text-sm"></h2>
                                </div>

                                <div>
                                    <label className="block mb-2 font-medium text-gray-700">Kategori</label>
                                    <select
                                        name="category"
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:border-[#45c517] focus:outline-none transition-colors duration-300 appearance-none bg-white cursor-pointer"
                                    >
                                        <option value="" disabled>Pilih Kategori</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    <h2 id="categoryError" className="text-red-500 text-sm"></h2>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        type="submit"
                                        className="  bg-[#45c517] text-white px-6 py-2 rounded-full hover:bg-[#3ba913] transition-colors duration-300 font-medium whitespace-nowrap"
                                    >
                                        Upload Artikel
                                    </button>
                                    <div className="flex-1 grid grid-cols-1 gap-2">
                                        <h2 id="formError" className="text-red-500 text-md line-clamp-2"></h2>
                                        <h2 id="successMessage" className="text-[#45c517] text-md font-medium line-clamp-2"></h2>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Preview Card Section */}
                        <div className="flex-1">
                            <h1 className='text-xl text-[#45c517] font-semibold mb-6'>Preview Artikel</h1>
                            <div className={`border rounded-lg shadow-md p-4 ${!showPreview ? 'blur-sm' : ''}`}>
                                <div className="w-full h-48 bg-gray-100 rounded-md mb-4 overflow-hidden">
                                    {previewData && previewData.imageUrl ? (
                                        <img
                                            src={previewData.imageUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                                            No Image Available
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-xl font-semibold">
                                        {previewData ? previewData.title : 'Judul Artikel'}
                                    </h2>
                                    <span className="inline-block bg-[#45c517] text-white px-3 py-1 rounded-full text-sm">
                                        {previewData ? previewData.category : 'Kategori'}
                                    </span>
                                    <div className="max-h-[150px] overflow-y-auto pr-2">
                                        <p className="text-gray-600">
                                            {previewData ? previewData.content : 'Konten artikel akan ditampilkan di sini setelah Anda mengunggah.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArticleForm;