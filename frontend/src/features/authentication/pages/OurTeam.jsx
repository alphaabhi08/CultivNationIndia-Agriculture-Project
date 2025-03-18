export default function OurTeam() {
  return (
    <>
      <h1 className="text-4xl mb-10 font-bold ml-20">Meet Our Team</h1>
      <div className="grid grid-cols-3 gap-8 p-16 mt-[-40px]">
        <div className="relative">
          <img
            src="public/Images/My2.jpg"
            alt="Abhishek"
            className="w-[400px] h-[400px] rounded-md object-cover"
          />
          <div className="absolute bottom-[5%] text-white bg-green-500 text-center ml-2 w-[87%] opacity-90 p-3">
            <p className="font-bold text-[20px]">Abhishek Nimavat</p>
            <p className="font-semibold">Founder</p>
          </div>
        </div>

        <div className="relative">
          <img
            src="public/Images/Nandish2.jpg"
            alt="Nandish"
            className="w-[400px] h-[400px] rounded-md object-cover"
          />
          <div className="absolute bottom-[5%] text-white bg-green-500 text-center ml-2 w-[87%] p-1 opacity-90">
            <p className="font-bold text-[20px]">Nandish Shah</p>
            <p className="font-semibold">
              Co-Founder.{" "}
              {/* <p className="text-[#FFD700] shadow-2xl font-bold bg-black">
              Eat Five Star. Do Nothing.
              </p> */}
            </p>
          </div>
        </div>

        <div className="relative">
          <img
            src="public/Images/Prashant_Sir.png"
            alt="Abhishek"
            className="w-[400px] h-[400px] rounded-md object-cover"
          />
          <div className="absolute bottom-[5%] text-white bg-green-500 text-center ml-2 w-[87%] opacity-90 p-3">
            <p className="font-bold text-[20px]">Prashant Sir</p>
            <p className="font-semibold">Instructor</p>
          </div>
        </div>
      </div>
    </>
  );
}
