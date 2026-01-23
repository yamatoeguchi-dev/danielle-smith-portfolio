import { Calendar } from "lucide-react";

type Props = {
  date: string;
  className?: string;
};

export default function ArticleMeta({ date, className }: Props) {
  return (
    <div className={`flex items-center gap-3 text-xs font-medium ${className ?? ""}`}>
      <span className="inline-flex items-center gap-1">
        {/* <Calendar className="h-3.5 w-3.5" /> */}
        {date}
      </span>
    </div>
  );
}
