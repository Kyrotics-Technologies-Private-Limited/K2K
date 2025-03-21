import { CreditCard, BadgePercent } from "lucide-react";

const KishanParivarHero = () => {
  return (
    <>
      <header className="w-full h-screen flex flex-col-reverse lg:flex-row items-center justify-center md:p-10 bg-green-100">
        <div className="w-full max-w-1/2 p-10">
          <div className="p-10 border-2 border-yellow-500 bg-white rounded-lg h-full flex flex-col justify-center items-center gap-10 shadow-xl">
            <div className="text-center flex">
              <BadgePercent size={60} className="text-yellow-500" />
              <span className="lg:text-4xl md:text-2xl sm:text-lg text-green-700 font-semibold px-0">
                Become a Premium member with Kishan Parivar
              </span>
              <BadgePercent size={60} className="text-yellow-500" />
            </div>
            {/* card */}
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-lg p-6 w-full lg:max-w-lg shadow-xl">
              <div className="flex justify-between items-start mb-16">
                <div>
                  <h3 className="text-xl font-semibold text-green-100">
                    Kishan Parivar
                  </h3>
                  <p className="text-green-200 text-sm">Premium Member</p>
                </div>
                <CreditCard size={28} className="text-green-100" />
              </div>
              <div className="mb-4">
                <p className="text-green-100 text-lg">•••• •••• •••• 1234</p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-green-200 text-xs">CARD HOLDER</p>
                  <p className="text-white">Kishan Kumar Pandit</p>
                </div>
                <div>
                  <p className="text-green-200 text-xs">VALID THRU</p>
                  <p className="text-white">03/30</p>
                </div>
              </div>
            </div>
          </div>
          {/* <ul>
      <li className="flex items-center gap-3">
        <Vegan size={20} className="text-green-600"/>
        <span className="text-gray-700 text-lg">Help the farmers</span>
      </li>
    </ul> */}
        </div>
        <div className="w-full max-w-1/2">
          <img
            className="w-[800px] p-10"
            src="/assets/images/KishanParivarHeroImage.png"
            alt=""
          />
        </div>
      </header>
    </>
  );
};

export default KishanParivarHero;

