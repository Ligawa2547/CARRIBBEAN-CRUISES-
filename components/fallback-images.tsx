export function FallbackImages() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <h2 className="text-xl font-bold mb-4">Cruise Ship Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="aspect-video rounded-lg overflow-hidden">
          <img src="/images/cruise-island.jpeg" alt="Cruise ship near island" className="w-full h-full object-cover" />
        </div>
        <div className="aspect-video rounded-lg overflow-hidden">
          <img src="/images/cruise-deck.jpeg" alt="Cruise ship deck" className="w-full h-full object-cover" />
        </div>
        <div className="aspect-video rounded-lg overflow-hidden">
          <img
            src="/images/cruise-caribbean-port.jpeg"
            alt="Cruise ship at port"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="aspect-video rounded-lg overflow-hidden">
          <img src="/images/cruise-ocean.jpeg" alt="Cruise ship on ocean" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  )
}
