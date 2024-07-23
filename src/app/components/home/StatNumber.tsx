import { poppins } from "@/lib/fonts";

type StatNumberProps = {
  value: string;
  label: string;
};

export default function StatNumber({ value, label }: StatNumberProps) {
  return (
    <div>
      <h1
        className={`text-primary text-5xl font-bold text-center ${poppins.className}`}
      >
        {value}
      </h1>
      <p className="text-lg font-medium text-gray-500 text-center">{label}</p>
    </div>
  );
}
