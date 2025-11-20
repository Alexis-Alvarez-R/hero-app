import { useRef } from "react";
import { useSearchParams } from "react-router";
import { Search, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { FiltersAccordion } from "./FiltersAccordion";

export const SearchControlls = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeAccordion = searchParams.get("active-accordion") ?? "";
  const activeAccordionCategory = searchParams.get("active-category") ?? "";
  const activeAccordionUniverse = searchParams.get("active-universe") ?? "";
  const activeAccordionStatus = searchParams.get("active-status") ?? "";

  const selectedStrength = Number(searchParams.get("strength") ?? "0");

  const inputRef = useRef<HTMLInputElement>(null);

  const setQueryParams = (name: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(name, value);

      return prev;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = inputRef.current?.value ?? "";
      setQueryParams("name", value);
    }
  };

  const handleClearAllFilters = () => {
    setSearchParams({});
  };

  return (
    <>
      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 bg-white">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Busca un personaje"
            className="pl-12 h-12 text-lg"
            ref={inputRef}
            defaultValue={searchParams.get("name") ?? ""}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            variant={activeAccordion === "advanced-filters" ? "default" : "outline"}
            className="h-12 "
            onClick={() => {
              if (activeAccordion === "advanced-filters") {
                setQueryParams("active-accordion", "");
                return;
              }

              setQueryParams("active-accordion", "advanced-filters");
            }}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Advanced Filters */}

      <Accordion type="single" collapsible value={activeAccordion}>
        <AccordionItem value="advanced-filters">
          <AccordionContent>
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                <Button variant="ghost" onClick={handleClearAllFilters}>
                  Clear All{" "}
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2"></div>

                <FiltersAccordion
                  labelElement="Categoria"
                  activeElement={activeAccordionCategory}
                  activeElementValue="active-category"
                  filter="category"
                  filterValues={["hero", "villain"]}
                  setQueryParams={setQueryParams}
                ></FiltersAccordion>

                <FiltersAccordion
                  labelElement="Universo"
                  activeElement={activeAccordionUniverse}
                  activeElementValue="active-universe"
                  filter="universe"
                  filterValues={["dc", "marvel"]}
                  setQueryParams={setQueryParams}
                ></FiltersAccordion>

                <FiltersAccordion
                  labelElement="Estado"
                  activeElement={activeAccordionStatus}
                  activeElementValue="active-status"
                  filter="status"
                  filterValues={["active", "deceased"]}
                  setQueryParams={setQueryParams}
                ></FiltersAccordion>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium">Minimum Strength: {selectedStrength}/10</label>
                <Slider
                  defaultValue={[selectedStrength]}
                  max={10}
                  step={1}
                  onValueChange={(value) => {
                    setQueryParams("strength", value[0].toString());
                  }}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
