export default function Footer() {
  return (
    <footer className="flex justify-center items-center bg-gray-800 text-white py-3 px-4">
      <div className="text-sm font-semibold text-center">
        <span>
          ©{" "}
          <span className="text-orange-500 cursor-pointer">
            CultivNationIndia.Com.
          </span>{" "}
          All Rights Reserved. Designed And Developed by
          <span className="text-orange-500 cursor-pointer">
            {" "}
            Abhishek Nimavat <span className="text-white">&</span> Nandish shah.
          </span>
        </span>
      </div>
    </footer>
  );
}
