interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  bullets: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <ol className="space-y-6 border-l border-neutral-800 pl-4">
      {items.map((item) => (
        <li key={item.id} className="relative pl-4">
          <span className="absolute -left-[9px] top-1 h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-neutral-100">
              {item.title}
            </h3>
            <p className="text-xs text-neutral-400">{item.subtitle}</p>
            <p className="text-[11px] text-neutral-500">{item.meta}</p>
            <ul className="mt-1 list-disc list-inside text-xs text-neutral-300 space-y-1">
              {item.bullets.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default Timeline;
