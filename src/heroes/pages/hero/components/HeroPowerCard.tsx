import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const colorMap = {
  red: "bg-red-600 text-red-600",
  purple: "bg-purple-600 text-purple-600",
  yellow: "bg-yellow-600 text-yellow-600",
  green: "bg-green-600 text-green-600",
} as const;

type ColorType = keyof typeof colorMap;

interface Props {
  powerName: string;
  powerValue: number;
  color: ColorType;
  icon: React.ReactNode;
}

export const HeroPowerCard = ({ powerName, powerValue, icon, color }: Props) => {
  const [bgColor, textColor] = colorMap[color].split(" ");

  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="font-semibold text-lg mb-2">{powerName}</h3>
        <div className={`text-3xl font-bold ${textColor} mb-2`}>{powerValue}</div>
        <Progress value={powerValue * 10} className="h-2" activeColor={bgColor} />
      </CardContent>
    </Card>
  );
};
