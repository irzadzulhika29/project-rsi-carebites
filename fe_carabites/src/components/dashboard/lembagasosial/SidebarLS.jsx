import { Link, useLocation } from 'react-router-dom';

const SidebarLS = () => {
    const location = useLocation();

    const isActive = (patterns) => {
        const pathArray = Array.isArray(patterns) ? patterns : [patterns];
        return pathArray.some(pattern => {
            // Cocok secara eksak atau pastikan awalan diikuti dengan "/"
            return location.pathname === pattern || location.pathname.startsWith(`${pattern}/`);
        });
    };

    const ROUTE_PATTERNS = {
        HOME: ['/lembaga-sosial', '/verif-form-ls'], // Cocok untuk halaman utama
        CHARITY: ['/charitycampaign-ls', '/update-charity-ls', '/update-charity-form-ls','/create-charity-ls'], // Cocok untuk halaman charity campaign dan update
        PROFILE: ['/profile-ls', '/edit-profil-ls'] // Cocok hanya untuk halaman profil
    };

    return (
        <section className="shadow-lg fixed h-screen bg-white">
            <nav className="w-60 flex flex-col my-3 p-5 min-h-screen">
                <Link className='hover:scale-110 duration-300' to="/">
                    <h1 className="text-3xl text-[#47cb18] font-bold mb-5">
                        Care<span className="text-black">Bites</span>
                    </h1>
                </Link>

                <ul className="text-md flex flex-col gap-3 justify-between">

                    <div className='text-md flex flex-col gap-3'>
                        {/* Home Link */}
                        <Link to="/lembaga-sosial" className={`flex items-center gap-2 px-2 py-3 hover:bg-[#47cb18] hover:text-white rounded-md ${isActive(ROUTE_PATTERNS.HOME) ? 'bg-[#47cb18] text-white' : 'text-gray'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                            </svg>
                            <h1>Home</h1>
                        </Link>


                        <Link to="/charitycampaign-ls" className={`flex items-center gap-2 px-2 py-3 hover:bg-[#47cb18] hover:text-white rounded-md ${isActive(ROUTE_PATTERNS.CHARITY) ? 'bg-[#47cb18] text-white' : 'text-gray'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                            </svg>
                            <h1>Charity Campaign</h1>
                        </Link>
                    </div>

                    {/* Profile Link */}
                    <Link to="/profile-ls" className={`flex items-center gap-2 px-2 py-3 hover:bg-[#47cb18] hover:text-white rounded-md ${isActive(ROUTE_PATTERNS.PROFILE) ? 'bg-[#47cb18] text-white' : 'text-gray'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>
                        <h1>My Profile</h1>
                    </Link>
                </ul>
            </nav>
        </section>
    );
};

export default SidebarLS;
