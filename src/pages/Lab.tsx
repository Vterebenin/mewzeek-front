import OctavesSelector from "@/components/common/OctavesSelector";
import Piano from "@/components/common/piano/Piano";
import { useState } from "react";
import * as Tone from "tone";

function Lab() {
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      partials: [0, 2, 3, 4],
    },
  }).toDestination();

  const [octaves, setOctaves] = useState<number[]>([4, 5, 7]);
  return (
    <div className="flex gap-10">
      <OctavesSelector
        value={octaves}
        onChange={(e) => setOctaves(e)}
        size="md"
      />
      <Piano synth={synth} octaves={octaves} />
    </div>
  );
}

export default Lab;
