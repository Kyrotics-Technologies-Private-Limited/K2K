// import React, { RefObject } from 'react';

// interface KishanParivarFormProps {
//   targetRef: RefObject<HTMLDivElement>;
// }

// const KishanParivarForm: React.FC<KishanParivarFormProps> = ({ targetRef }) => {
//   return (
//     <div 
//       ref={targetRef} 
//       className="flex items-center justify-center py-10 relative"
//       style={{
//         backgroundImage: "url('https://images.unsplash.com/photo-1615472910606-9d4f7291944f?auto=format&fit=crop&q=80&w=2000')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Blur overlay */}
//       <div className="absolute inset-0 backdrop-blur-sm bg-green-950/60"></div>
    
//       {/* Form container */}
//       <form className="w-full max-w-lg border-2 border-green-700 p-4 rounded-md bg-white relative z-10 mx-4 sm:mx-2">
//         <div className="flex flex-wrap -mx-3 mb-6">
//           <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-first-name"
//             >
//               First Name
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-brand"
//               id="grid-first-name"
//               type="text"
//               placeholder="Jane"
//             />
//             <p className="text-red-500 text-xs italic">
//               Please fill out this field.
//             </p>
//           </div>
//           <div className="w-full md:w-1/2 px-3">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-last-name"
//             >
//               Last Name
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-brand"
//               id="grid-last-name"
//               type="text"
//               placeholder="Doe"
//             />
//           </div>
//         </div>
//         <div className="flex flex-wrap -mx-3 mb-6">
//           <div className="w-full px-3">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-email"
//             >
//               Email
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-brand"
//               id="grid-email"
//               type="email"
//               placeholder="abc@gmail.com"
//             />
//             {/* <p className="text-gray-600 text-xs italic">
//               Enter valid email only
//             </p> */}
//           </div>
//         </div>
//         <div className="flex flex-wrap -mx-3 mb-6">
//           <div className="w-full px-3">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-password"
//             >
//               Password
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-brand"
//               id="grid-password"
//               type="password"
//               placeholder="******************"
//             />
//             {/* <p className="text-gray-600 text-xs italic">
//               Make it as long and as crazy as you'd like
//             </p> */}
//           </div>
//         </div>
//         <div className="flex flex-wrap -mx-3 mb-6">
//           <div className="w-full px-3">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-confirm-password"
//             >
//               Confirm Password
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-brand"
//               id="grid-confirm-password"
//               type="password"
//               placeholder="******************"
//             />
//             <p className="text-gray-600 text-xs italic">
//               Enter the same password
//             </p>
//           </div>
//         </div>
//         <div className="flex flex-wrap -mx-3 mb-6">
//           <div className="w-full px-3">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-date-of-birth"
//             >
//               Date of birth
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-brand"
//               id="grid-date-of-birth"
//               type="date"
//               placeholder="******************"
//             />
//             {/* <p className="text-gray-600 text-xs italic">
//               Make it as long and as crazy as you'd like
//             </p> */}
//           </div>
//         </div>
//         <div className="flex flex-wrap -mx-3 mb-2">
//           <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-city"
//             >
//               City
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-brand"
//               id="grid-city"
//               type="text"
//               placeholder="Kolkata"
//             />
//           </div>
//           <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-state"
//             >
//               State
//             </label>
//             <div className="relative">
//               <select
//                 className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-green-brand"
//                 id="grid-state"
//                 defaultValue="Select"
//               >
//                 <option>Select</option>
//                 <option>West Bengal</option>
//                 <option>Telengana</option>
//                 <option>Bihar</option>
//                 <option>Karnataka</option>
//                 <option>Punjab</option>
//               </select>
//               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                 <svg
//                   className="fill-current h-4 w-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//           <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="grid-zip"
//             >
//               PIN
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-brand"
//               id="grid-zip"
//               type="text"
//               placeholder="700001"
//             />
//           </div>
//         </div>
//         <div className="flex justify-center items-center mt-6">
//           <button type="submit" className="rounded-md p-2 bg-white border border-green-brand text-green-brand w-36 hover:shadow-md hover:bg-green-brand hover:text-white "> Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default KishanParivarForm;

import React, { RefObject } from 'react';

interface KishanParivarFormProps {
  targetRef: RefObject<HTMLDivElement>;
}

const KishanParivarForm: React.FC<KishanParivarFormProps> = ({ targetRef }) => {
  return (
    <div 
      ref={targetRef} 
      className="flex items-center justify-center py-16 px-4 relative min-h-screen"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1615472910606-9d4f7291944f?auto=format&fit=crop&q=80&w=2000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-green-950/90"></div>
    
      {/* Form container with improved styling */}
      <form className="w-full max-w-2xl border border-green-300/30 p-4 sm:p-6 md:p-8 rounded-xl bg-white backdrop-blur-sm shadow-2xl relative z-10 mx-2 sm:mx-4 transition-all duration-300 hover:shadow-green-200/20">
        <h2 className="text-3xl font-bold text-center text-green-brand mb-8">
          Kishan Parivar Membership
        </h2>
        
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-50 text-gray-700 border-b-2 border-green-300 rounded-t py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
            />
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-50 text-gray-700 border-b-2 border-green-300 rounded-t py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-50 text-gray-700 border-b-2 border-green-300 rounded-t py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
              id="grid-email"
              type="email"
              placeholder="abc@gmail.com"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-50 text-gray-700 border-b-2 border-green-300 rounded-t py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
              id="grid-password"
              type="password"
              placeholder="******************"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-confirm-password"
            >
              Confirm Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-50 text-gray-700 border-b-2 border-green-300 rounded-t py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
              id="grid-confirm-password"
              type="password"
              placeholder="******************"
            />
            <p className="text-gray-500 text-xs italic mt-1">
              Enter the same password
            </p>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-date-of-birth"
            >
              Date of birth
            </label>
            <input
              className="appearance-none block w-full bg-gray-50 text-gray-700 border-b-2 border-green-300 rounded-t py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
              id="grid-date-of-birth"
              type="date"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              City
            </label>
            <input
              className="appearance-none block w-full bg-gray-50 text-gray-700 border-b-2 border-green-300 rounded-t py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
              id="grid-city"
              type="text"
              placeholder="Kolkata"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              State
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-50 border-b-2 border-green-300 text-gray-700 py-3 px-4 pr-8 rounded-t leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
                id="grid-state"
                defaultValue="Select"
              >
                <option>Select</option>
                <option>West Bengal</option>
                <option>Telengana</option>
                <option>Bihar</option>
                <option>Karnataka</option>
                <option>Punjab</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-zip"
            >
              PIN
            </label>
            <input
              className="appearance-none block w-full bg-gray-50 text-gray-700 border-b-2 border-green-300 rounded-t py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-green-500 transition-colors duration-200"
              id="grid-zip"
              type="text"
              placeholder="700001"
            />
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button 
            type="submit" 
            className="relative overflow-hidden px-8 py-3 bg-green-brand text-white font-medium rounded-lg shadow-md hover:shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="relative z-10">Submit Application</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default KishanParivarForm;