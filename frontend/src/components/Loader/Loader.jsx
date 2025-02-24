export default function Loader() {
  return (
    <div className="flex flex-col items-center h-screen w-full">
      <img
        src="/Images/logoC.png"
        alt="Loading..."
        className="mt-48 ml-4 w-auto h-auto"
      />

      <div className="mt-4 w-20 h-1 bg-gray-200 rounded-full relative overflow-hidden">
        <div className="w-8 h-1 bg-green-500 rounded-full animate-slide"></div>
      </div>
    </div>
  );
}
