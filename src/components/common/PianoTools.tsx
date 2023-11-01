import s from "@/components/common/piano/piano.module.sass";
import React, { useState } from "react";
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

interface PianoProps {
  synth: Tone.PolySynth;
  octaves: number[];
}

function Piano({ synth, octaves }: PianoProps) {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const mapOctaves = (...octs: number[]) => {
    let octaves: React.ReactNode = [];
    for (const octave of octs) {
      const items = getOctaveItems(octave);
      octaves = [...octaves, ...items];
    }
    return octaves;
  };

  const handleMouseDown = (item: OctaveItem) => {
    const { note } = item;
    setActiveKeys([...activeKeys, note]);
    synth.triggerAttack(note);
  };

  const handleMouseOver = (item: OctaveItem) => {
    if (activeKeys.length > 0) {
      const { note } = item; // Replace with your note mapping
      if (!activeKeys.includes(note)) {
        synth.triggerRelease(activeKeys[0]);
        setActiveKeys([note]);
        synth.triggerAttack(note);
      }
    }
  };
  const handleMouseUp = (item: OctaveItem) => {
    if (activeKeys.length) {
      setActiveKeys([]);
      synth.triggerRelease(item.note);
    }
  };

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
      ></div>
    ));

  return <div className={s.piano}>{mapOctaves(...octaves)}</div>;
}

export default Piano;
