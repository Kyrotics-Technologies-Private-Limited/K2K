export default function FarmerBanner() {
  return (
    <div className="relative h-[400px] md:h-[600px] lg:h-[750px]">
      {/* Background Image with Fixed Effect */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1627920768905-575535d6dd2e')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 flex items-center justify-center">
        <div className="text-center text-white px-6">
          <h2 className="text-xl md:text-5xl font-bold drop-shadow-lg">
            Empowering Farmers, Cultivating Nature
          </h2>
          <p className="text-sm md:text-xl mt-4 drop-shadow-md max-w-2xl mx-auto">
            Supporting sustainable farming and organic products for a healthier
            future.
          </p>
        </div>
      </div>
    </div>
  );
}
