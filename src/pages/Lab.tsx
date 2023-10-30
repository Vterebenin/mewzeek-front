import Piano from "@/components/common/piano/Piano";
import * as Tone from "tone";
const synth = new Tone.PolySynth().toDestination();

function MyPiano() {
  const playNote = (note: string) => {
    synth.triggerAttack(note);
  };

  const releaseNote = (note: string) => {
    synth.triggerRelease(note);
  };

  return (
    <div>
      <button
        onMouseDown={() => playNote("C4")}
        onMouseUp={() => releaseNote("C4")}
      >
        Play C4
      </button>
      {/* Add more buttons for other notes */}
    </div>
  );
}

function Lab() {
  return (
    <>
      <MyPiano />
      <Piano />
    </>
  );
}

export default Lab;
