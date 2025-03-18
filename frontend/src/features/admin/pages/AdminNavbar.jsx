export default function AdminNavbar() {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    // <header className="bg-[#28a745] text-white flex justify-between items-center px-8 py-4 shadow-md fixed top-0 left-72 right-0 h-[72px]">
    <header className="bg-[#28a745] text-white  flex justify-between items-center px-8 py-4 shadow-md fixed w-screen">
      {/* Logo */}
      <div className="text-2xl font-bold ml-[10px]">
        <span className="text-yellow-400">CultivNation</span>
        <span className="ml-1">India</span>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg ml-[900px] font-semibold transition"
      >
        Logout
      </button>

      {/* Welcome Message */}
      <div className="text-lg font-bold mr-7">Welcome Admin</div>
    </header>
  );
}
