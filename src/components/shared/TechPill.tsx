interface TechPillProps {
  label: string;
}

const TechPill = ({ label }: TechPillProps) => (
  <span className="border border-neutral-700 rounded-full px-3 py-1 text-[11px] text-neutral-200">
    {label}
  </span>
);

export default TechPill;
