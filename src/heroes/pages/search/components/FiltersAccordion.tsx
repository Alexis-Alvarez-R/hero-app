import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface Props {
  labelElement: string;
  activeElement: string;
  activeElementValue: string;
  filter: string;
  filterValues: string[];
  setQueryParams: (param: string, value: string) => void;
}

export const FiltersAccordion = ({
  activeElement,
  activeElementValue,
  filter,
  filterValues,
  labelElement,
  setQueryParams,
}: Props) => {
  return (
    <div className="space-y-2">
      <Button
        className="w-full "
        variant={activeElement === activeElementValue ? "default" : "outline"}
        onClick={() => {
          if (activeElement === activeElementValue) {
            setQueryParams(activeElement, "");
            return;
          }

          setQueryParams(activeElementValue, activeElementValue);
        }}
      >
        {labelElement}
      </Button>
      <Accordion type="single" collapsible value={activeElement}>
        <AccordionItem value={activeElementValue}>
          <AccordionContent className="flex  gap-2">
            {filterValues.map((value) => (
              <button
                className="h-10 w-[40%] rounded-md border  border-input  px-3 py-2 text-sm bg-background-700  cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => {
                  setQueryParams(filter, value);
                }}
              >
                {value}
              </button>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
