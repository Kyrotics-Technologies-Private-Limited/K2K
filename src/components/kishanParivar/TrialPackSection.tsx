const TrialPackSection = () => {
    return (
        <div className="flex items-center justify-center h-auto py-12 sm:py-16 px-4 bg-[#fffbe8]">
            <div className="w-full max-w-7xl bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Text Content */}
                    <div className="p-8 sm:p-10 flex flex-col justify-center">
                        <div className="mb-1 text-sm font-semibold text-green-brand tracking-wider">
                            EXCLUSIVE OFFER
                        </div>
                        <h1 className="mb-4 text-3xl sm:text-4xl font-bold leading-tight">
                            Explore <span className="text-green-brand">1200+ Trial Packs</span> with Kishan Parivar
                        </h1>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-5 w-5 text-green-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-3 text-gray-600 text-lg">
                                    Get free trials of featured products delivered to your home
                                </p>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-5 w-5 text-green-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-3 text-gray-600 text-lg">
                                    Free delivery for orders with 5+ products
                                </p>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-5 w-5 text-green-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-3 text-gray-600 text-lg">
                                    Exclusive discounts on future purchases
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-6 py-3 bg-green-brand text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                Get Your Card Now
                            </button>
                            <button className="px-6 py-3 border-2 border-green-brand text-green-brand hover:bg-green-50 font-medium rounded-lg transition-all duration-300">
                                Browse Trial Packs
                            </button>
                        </div>
                    </div>
                    
                    {/* Image */}
                    <div className="hidden md:block relative bg-green-50 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                            alt="Farm products trial packs"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <div className="bg-green-100 p-3 rounded-full mr-4">
                                    <svg className="h-6 w-6 text-green-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">Limited Time Offer</p>
                                    <p className="text-sm text-gray-600">First 1000 members get extra benefits</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TrialPackSection;