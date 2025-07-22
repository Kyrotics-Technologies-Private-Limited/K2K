const MembershipStatusSection = () => {
    // This would typically come from your user/membership context or API
    const membershipDaysLeft = 23; // Example: 23 days remaining
    const membershipType = "Premium"; // Example membership type
    const isExpiringSoon = membershipDaysLeft <= 7;

    return (
        <div className="flex items-center justify-center h-auto py-12 sm:py-16 px-4 bg-[#fffbe8]">
            <div className="w-full max-w-7xl bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Text Content */}
                    <div className="p-8 sm:p-10 flex flex-col justify-center">
                        <div className={`mb-1 text-sm font-semibold tracking-wider ${
                            isExpiringSoon ? 'text-red-600' : 'text-green-brand'
                        }`}>
                            {isExpiringSoon ? 'MEMBERSHIP EXPIRING SOON' : 'ACTIVE MEMBERSHIP'}
                        </div>
                        <h1 className="mb-4 text-3xl sm:text-4xl font-bold leading-tight">
                            {membershipDaysLeft} Days Remaining
                        </h1>
                        <p className="mb-6 text-lg text-gray-600">
                            Your {membershipType} membership with Kishan Parivar
                        </p>
                        
                        <div className="space-y-3 mb-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-5 w-5 text-green-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-3 text-gray-600 text-lg">
                                    Access to premium farm products
                                </p>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-5 w-5 text-green-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-3 text-gray-600 text-lg">
                                    Fast delivery on all orders
                                </p>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <svg className="h-5 w-5 text-green-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="ml-3 text-gray-600 text-lg">
                                    Exclusive member discounts
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                            {isExpiringSoon ? (
                                <button className="button px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                    Renew Membership
                                </button>
                            ) : (
                                <button className="button px-6 py-3 bg-green-brand text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                    Extend Membership
                                </button>
                            )}
                            {/* <button className="button px-6 py-3 border-2 border-green-brand text-green-brand hover:bg-green-50 font-medium rounded-lg transition-all duration-300">
                                View Benefits
                            </button> */}
                        </div>
                    </div>
                    
                    {/* Image */}
                    <div className="hidden md:block relative bg-green-50 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10"></div>
                        <img 
                            src="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                            alt="Premium membership benefits"
                            className="w-full h-full object-cover object-center"
                        />
                        <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <div className={`p-3 rounded-full mr-4 ${
                                    isExpiringSoon ? 'bg-red-100' : 'bg-green-100'
                                }`}>
                                    <svg className={`h-6 w-6 ${
                                        isExpiringSoon ? 'text-red-600' : 'text-green-brand'
                                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">
                                        {isExpiringSoon ? 'Renewal Reminder' : 'Membership Active'}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {isExpiringSoon 
                                            ? 'Don\'t lose your premium benefits' 
                                            : 'Enjoying all premium features'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MembershipStatusSection;