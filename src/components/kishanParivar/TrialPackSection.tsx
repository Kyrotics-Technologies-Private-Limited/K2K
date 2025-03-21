// const TrialPackSection = () => {
//     return (
//         <div className="flex items-center justify-center h-52 bg-green-100">
//             <div className="mx-4 text-3xl font-bold bg-blue-100 border-2 border-yellow-500 rounded-xl p-4">
//                 <p className="mb-4">Explore <span className="text-yellow-500">1200+ Trial Packs</span> only with Kishan Parivar Card</p>
//                 <p className="text-gray-600 text-lg font-light">Get free trial of featured products at your home</p>
//                 <p className="text-gray-600 text-lg font-light">Free delivery for more than 5 products</p>
//             </div>
//         </div>
//     )
// }

// export default TrialPackSection;

const TrialPackSection = () => {
    return (
        <div className="flex items-center justify-center h-auto py-10 bg-green-100 px-4">
            <div className="w-full max-w-lg text-center sm:text-left bg-blue-100 border-2 border-yellow-500 rounded-xl p-6 sm:p-8">
                <p className="mb-4 text-2xl sm:text-3xl font-bold">
                    Explore <span className="text-yellow-500">1200+ Trial Packs</span> only with Kishan Parivar Card
                </p>
                <p className="text-gray-600 text-base sm:text-lg font-light">
                    Get free trial of featured products at your home
                </p>
                <p className="text-gray-600 text-base sm:text-lg font-light">
                    Free delivery for more than 5 products
                </p>
            </div>
        </div>
    );
}

export default TrialPackSection;