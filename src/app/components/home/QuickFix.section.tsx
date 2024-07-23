import StatNumber from "./StatNumber";

const StatData = [
  {
    value: "2024",
    label: "Established",
  },
  {
    value: "50+",
    label: "Reports Published Annually",
  },
  {
    value: "30+",
    label: "Surveys Conducted",
  },
  {
    value: "100+",
    label: "Research projects Supported",
  },
  {
    value: "20+",
    label: "Collaborating Departments",
  },
];

export default function QuickFixSection() {
  return (
    <div className="container my-20">
      <p className="mx-auto text-center text-black text-lg font-medium">
        Quick Facts
      </p>
      <h5 className="font-medium text-primary text-3xl text-center my-2">
        Our Impacts at a Glance
      </h5>
      <p className="text-[#767676E5] text-lg max-w-4xl mx-auto text-center">
        Empowering Obafemi Awolowo University with fresh, data-driven insights
        and strategic analysis, fostering academic excellence and operational
        efficiency from the ground up
      </p>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {StatData.map((stat, index) => (
          <StatNumber key={index} value={stat.value} label={stat.label} />
        ))}
      </div>
    </div>
  );
}
