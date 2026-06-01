export default function Footer() {
  return (
    <footer className="bg-[#1A3A5C] text-white py-8 px-4 mb-16">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-[#EA580C] rounded flex items-center justify-center">
            <span className="font-bold text-sm">2M</span>
          </div>
          <span className="font-bold text-lg">2M Construction</span>
        </div>
        <p className="text-gray-300 text-sm mb-4">
          Professional construction and remodeling services in Huntsville, AL and surrounding areas.
        </p>
        <div className="space-y-1 text-sm text-gray-300">
          <p>(256) 555-1234</p>
          <p>info@2mconstruction.com</p>
          <p>Huntsville, AL</p>
        </div>
        <p className="text-gray-500 text-xs mt-6">2026 2M Construction. All rights reserved.</p>
      </div>
    </footer>
  );
}
