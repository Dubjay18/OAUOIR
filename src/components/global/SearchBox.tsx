import { Search } from "lucide-react";

export default function Searchbox({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex bg-[#F4F4F4] border-b-2 border-[#8D8D8D] ${className}`}
    >
      <Search className="h-12 w-10 px-2" size={24} />
      <input
        type="text"
        placeholder="Search..."
        className="h-12 px-2 bg-transparent w-full outline-none"
      />
    </div>
  );
}
