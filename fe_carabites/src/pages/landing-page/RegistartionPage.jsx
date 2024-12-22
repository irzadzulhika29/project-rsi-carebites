import { useState } from "react";
import NavbarLanding from "../../components/landingpage/NavbarLanding";
import RegistImage from "../../assets/img/donate.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission
        
        setLoading(true);  // Start loading

        const formData = new FormData();
        const formElements = e.target.elements;

        // Add form data to FormData object
        formData.append("nama_user", formElements.username.value);
        formData.append("email", formElements.email.value);
        formData.append("password", formElements.password.value);
        formData.append("konfirmasi_password", formElements.confirmPassword.value);
        formData.append("no_telp_user", formElements.phoneNumber.value);
        formData.append("role", formElements.daftarSebagai.value);

        try {
            // Send POST request to the API with JSON data
            const response = await axios.post("http://localhost:8085/auth/register", formData, {
              headers: {
                "Content-Type": "application/json", // Set content type as JSON
              },
            });
        
            if (response.status === 201) {
              // If the request was successful, reset form and navigate
              alert("Registrasi Berhasil!");
              setLoading(false);    
              navigate("/login");  
        
            } else {
              setLoading(false);
              setError("Terjadi kesalahan. Silakan coba lagi.");
            }
          } catch (error) {
            console.error("Error registering:", error);
            setLoading(false);
            setError("Terjadi kesalahan saat registrasi. Silakan coba lagi.");
          }
        };

    return (
        <div>
            <NavbarLanding />
            <section className="pt-24 min-h-screen flex items-center justify-center py-10">
                <div className="p-5 max-w-3xl shadow-lg bg-gray-100 flex rounded-2xl items-center">
                    <div className='md:w-1/2 px-16'>
                        <h1 className="text-2xl font-bold text-[#45c517]">Registration</h1>
                        <p className='text-sm mt-4 text-[#45c517]'>If You Already A Member, Easily Log In</p>

                        {/* Show error message if any */}
                        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                            <input className='p-2 rounded-xl mt-8 border' type="text" name="username" placeholder='Username' />
                            <input className='p-2 rounded-xl border' type="email" name="email" placeholder='Email' />
                            <input className='p-2 rounded-xl border' type="text" name="phoneNumber" placeholder='Phone Number' />

                            {/* Dropdown "Daftar Sebagai" */}
                            <select className='p-2 rounded-xl border' name="daftarSebagai" defaultValue="">
                                <option value="" disabled>Daftar Sebagai</option>
                                <option value="pengguna">Pengguna</option>
                                <option value="mitra">Mitra</option>
                                <option value="lembaga sosial">Lembaga Sosial</option>
                            </select>

                            <div className='relative'>
                                <input
                                    className='p-2 rounded-xl border w-full'
                                    type="password"
                                    name="password"
                                    placeholder='Password'
                                />
                            </div>

                            <div className='relative'>
                                <input
                                    className='p-2 rounded-xl border w-full'
                                    type="password"
                                    name="confirmPassword"
                                    placeholder='Confirm Password'
                                />
                            </div>

                            <button
                                type="submit"
                                className={`bg-[#45c517] rounded-xl py-2 text-white hover:scale-105 duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={loading}
                            >
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </form>
                    </div>

                    <div className='md:block hidden w-1/2'>
                        <img className=' rounded-2xl' src={RegistImage} alt="Login Illustration" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegistrationPage;
