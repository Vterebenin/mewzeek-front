import { addOrRemove } from "@/helpers";
import { Checkbox } from "@chakra-ui/react";

const OCTAVE_NUMBERS = [1, 2, 3, 4, 5, 6, 7];
interface OctavesSelectorProps {
  size: "md" | "lg";
  value: number[];
  onChange: (v: number[]) => void;
}
function OctavesSelector({ size, value, onChange }: OctavesSelectorProps) {
  const handleChange = (oct: number) => {
    onChange(addOrRemove(value, oct).sort());
  };
  return (
    <div>
      <div>Choose Octaves</div>
      <div className="flex flex-col gap-2">
        {OCTAVE_NUMBERS.map((oct) => {
          return (
            <Checkbox
              key={oct}
              size={size}
              isChecked={value.includes(oct)}
              onChange={() => handleChange(oct)}
            >
              {oct}
            </Checkbox>
          );
        })}
      </div>
    </div>
  );
}

export default OctavesSelector;
