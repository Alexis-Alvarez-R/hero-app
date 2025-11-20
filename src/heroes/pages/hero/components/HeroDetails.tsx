import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { getCategoryColor, getStatusColor } from "@/heroes/helpers";
import type { Hero } from "@/heroes/interface/hero";

interface Props {
  hero: Hero;
}

export const HeroDetails = ({ hero }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Detalles Personales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Nombre Real:</span>
            <span className="font-semibold">{hero.name}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Alias:</span>
            <span className="font-semibold">{hero.alias}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Categoría:</span>
            <Badge className={`${getCategoryColor(hero.category)} text-white`}>{hero.category}</Badge>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Estado:</span>
            <Badge className={`${getStatusColor(hero.status)} text-white`}>{hero.status}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información del Universo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Universo:</span>
            <span className="font-semibold">{hero.universe}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Primera Aparición:</span>
            <span className="font-semibold">{hero.firstAppearance}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Años Activo:</span>
            <span className="font-semibold">
              {new Date().getFullYear() - Number.parseInt(hero.firstAppearance)} años
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
