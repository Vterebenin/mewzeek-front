import s from "@/components/common/piano/piano.module.css";
import { ReactJSXElement } from "node_modules/@emotion/react/types/jsx-namespace";
import { useCallback, useState } from "react";
import * as Tone from "tone";

interface OctaveItem {
  note: string;
  releaser: string;
  style: string;
}
const getOctave = (oct: number) => [
  { note: `C${oct}`, releaser: "8n", style: s.whiteKey },
  { note: `Db${oct}`, releaser: "8n", style: s.blackKey },
  { note: `D${oct}`, releaser: "8n", style: s.whiteKey },
  { note: `Eb${oct}`, releaser: "8n", style: s.blackKey },
  { note: `E${oct}`, releaser: "8n", style: s.whiteKey },
  { note: `F${oct}`, releaser: "8n", style: s.whiteKey },
  { note: `Gb${oct}`, releaser: "8n", style: s.blackKey },
  { note: `G${oct}`, releaser: "8n", style: s.whiteKey },
  { note: `Ab${oct}`, releaser: "8n", style: s.blackKey },
  { note: `A${oct}`, releaser: "8n", style: s.whiteKey },
  { note: `Bb${oct}`, releaser: "8n", style: s.blackKey },
  { note: `B${oct}`, releaser: "8n", style: s.whiteKey },
];

const synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    partials: [0, 2, 3, 4],
  },
}).toDestination();

function Piano() {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const mapOctaves = (...octs: number[]) => {
    let octaves: ReactJSXElement[] = [];
    for (const octave of octs) {
      const items = getOctaveItems(octave);
      octaves = [...octaves, ...items];
    }
    return octaves;
  };

  const handleMouseDown = useCallback(
    (item: OctaveItem) => {
      const { note } = item;
      setActiveKeys([...activeKeys, note]);
      synth.triggerAttack(note);
    },
    [activeKeys],
  );

  const handleMouseOver = useCallback(
    (item: OctaveItem) => {
      if (activeKeys.length > 0) {
        const { note } = item; // Replace with your note mapping
        if (!activeKeys.includes(note)) {
          synth.triggerRelease(activeKeys[0]);
          setActiveKeys([note]);
          synth.triggerAttack(note);
        }
      }
    },
    [activeKeys],
  );
  const handleMouseUp = useCallback(
    (item: OctaveItem) => {
      if (activeKeys.length) {
        setActiveKeys([]);
        synth.triggerRelease(item.note);
      }
    },
    [activeKeys],
  );

  const handleMouseOut = (item: OctaveItem) => {
    const keys = [...activeKeys];
    const { note } = item;
    const index = keys.indexOf(note);
    if (index > -1) {
      keys.splice(index, 1);
    }
    setActiveKeys(keys);

    if (note) {
      synth.triggerRelease(note);
    }
  };

  const getOctaveItems = (octave: number) =>
    getOctave(octave).map((item) => (
      <div
        className={`${item.style} ${
          activeKeys.includes(item.note) ? s.active : ""
        }`}
        key={item.note}
        onMouseDown={() => handleMouseDown(item)}
        onMouseOver={() => handleMouseOver(item)}
        onMouseUp={() => handleMouseUp(item)}
        onMouseLeave={() => handleMouseOut(item)}
        draggable="false"
        // onClick={() => playSynthTone(item)}
      ></div>
    ));

  return <div className={s.piano}>{mapOctaves(1, 2, 3)}</div>;
}

export default Piano;
