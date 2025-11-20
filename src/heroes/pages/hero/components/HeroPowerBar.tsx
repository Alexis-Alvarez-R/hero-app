import { Progress } from "@/components/ui/progress";

const colorMap = {
  red: "bg-red-600",
  purple: "bg-purple-600",
  yellow: "bg-yellow-600",
  green: "bg-green-600",
} as const;

type ColorType = keyof typeof colorMap;

interface Props {
  powerName: string;
  powerValue: number;
  color: ColorType;
}

export const HeroPowerBar = ({ powerName, powerValue, color }: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-24 text-sm font-medium">{powerName}</div>
        <div className="flex-1">
          <Progress value={powerValue * 10} className="h-4" activeColor={colorMap[color]} />
        </div>
        <div className="w-12 text-right font-bold">{powerValue}/10</div>
      </div>
    </div>
  );
};
