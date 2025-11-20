import { useParams } from "react-router";
import { Shield, Zap, Brain, Gauge, Users, Award } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useHero } from "@/heroes/hooks/useHero";
import { HeroPowerCard } from "./components/HeroPowerCard";
import { HeroPowerBar } from "./components/HeroPowerBar";
import { HeroHeader } from "./components/HeroHeader";
import { HeroDetails } from "./components/HeroDetails";
import { HeroPowers } from "./components/HeroPowers";

export const HeroPage = () => {
  const { idSlug = "" } = useParams();

  const { queryHero } = useHero(idSlug);

  if (!queryHero.data) {
    return <div>No hay nada</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}

      <HeroHeader hero={queryHero.data}></HeroHeader>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Gauge className="w-4 h-4" />
              Estadísticas
            </TabsTrigger>
            <TabsTrigger value="powers" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Poderes
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Equipo
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Información
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Strength */}

              <HeroPowerCard
                powerName="Fuerza"
                powerValue={queryHero.data.strength}
                icon={
                  <div className="bg-red-100 p-3 rounded-full">
                    <Zap className="w-8 h-8 text-red-600" />
                  </div>
                }
                color="red"
              ></HeroPowerCard>

              {/* Intelligence */}

              <HeroPowerCard
                powerName="Inteligencia"
                powerValue={queryHero.data.intelligence}
                icon={
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Brain className="w-8 h-8 text-purple-600" />
                  </div>
                }
                color="purple"
              ></HeroPowerCard>

              {/* Speed */}

              <HeroPowerCard
                powerName="Velocidad"
                powerValue={queryHero.data.speed}
                icon={
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Gauge className="w-8 h-8 text-yellow-600" />
                  </div>
                }
                color="yellow"
              ></HeroPowerCard>

              {/* Durability */}

              <HeroPowerCard
                powerName="Resistencia"
                powerValue={queryHero.data.durability}
                icon={
                  <div className="bg-green-100 p-3 rounded-full">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                }
                color="green"
              ></HeroPowerCard>
            </div>

            {/* Power Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Comparación de Habilidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <HeroPowerBar powerName="Fuerza" powerValue={queryHero.data.strength} color="red"></HeroPowerBar>

                  <HeroPowerBar
                    powerName="Inteligencia"
                    powerValue={queryHero.data.intelligence}
                    color="purple"
                  ></HeroPowerBar>

                  <HeroPowerBar powerName="Velocidad" powerValue={queryHero.data.speed} color="yellow"></HeroPowerBar>

                  <HeroPowerBar
                    powerName="Resistencia"
                    powerValue={queryHero.data.durability}
                    color="green"
                  ></HeroPowerBar>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="powers">
            <HeroPowers hero={queryHero.data}></HeroPowers>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-green-500" />
                  Afiliación de Equipo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="bg-green-100 p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">{queryHero.data.team}</h3>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info">
            <HeroDetails hero={queryHero.data}></HeroDetails>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
