import s from "@/components/common/piano/piano.module.css";
import { ReactJSXElement } from "node_modules/@emotion/react/types/jsx-namespace";
import { useCallback, useState } from "react";
import * as Tone from "tone";

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

function Piano() {
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const mapOctaves = (...octs: number[]) => {
    let octaves: ReactJSXElement[] = [];
    for (const octave of octs) {
      const items = getOctaveItems(octave);
      octaves = [...octaves, ...items];
    }
    return octaves;
  };

  const [synth] = useState(
    new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        partials: [0, 2, 3, 4],
      },
    }).toDestination(),
  );
  synth.debug = true;
  const handleMouseDown = useCallback(
    (key: string) => {
      setIsMouseDown(true);
      setActiveKeys([...activeKeys, key]);
      const note = key; // Replace with your note mapping
      synth.triggerAttack(note);
      setCurrentNote(note);
      console.log(synth);
    },
    [synth, activeKeys],
  );

  const handleMouseOver = useCallback(
    (key: string) => {
      if (!isMouseDown) return;
      if (activeKeys.length > 0) {
        setActiveKeys([key]);
        const note = key; // Replace with your note mapping
        if (note !== currentNote && currentNote) {
          synth.triggerRelease(note);
          synth.triggerAttack(note);
          setCurrentNote(note);
        }
      }
    },
    [synth, isMouseDown, activeKeys, currentNote],
  );
  const handleMouseUp = useCallback(
    (note: string) => {
      setActiveKeys([]);
      if (currentNote) {
        synth.triggerRelease(note);
        setCurrentNote(null);
      }
      setIsMouseDown(false);
    },
    [synth, currentNote],
  );

  const handleMouseOut = (note: string) => {
    const keys = [...activeKeys];
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
        onMouseDown={() => handleMouseDown(item.note)}
        onMouseOver={() => handleMouseOver(item.note)}
        onMouseUp={() => handleMouseUp(item.note)}
        onMouseOut={() => handleMouseOut(item.note)}
        draggable="false"
        // onClick={() => playSynthTone(item)}
      ></div>
    ));

  return <div className={s.piano}>{mapOctaves(1, 2, 3)}</div>;
}

export default Piano;
