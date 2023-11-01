import OctavesSelector from "@/components/common/OctavesSelector";
import TheButton from "@/components/common/TheButton";
import Piano from "@/components/common/piano/Piano";
import WaveSurferPlayer from "@/components/common/waver/Wave";
import { useCallback, useMemo, useState } from "react";
import * as Tone from "tone";
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.js";

//   return (
//     <>
//     </>
//   )
function Lab() {
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      partials: [0, 2, 3, 4],
    },
  }).toDestination();

  const [octaves, setOctaves] = useState<number[]>([4, 5, 7]);

  const urls = useMemo(() => ["/examples/audio/aphex_sample.mp3"], []);
  const [audioUrl, setAudioUrl] = useState(urls[0]);

  // Swap the audio URL
  const onUrlChange = useCallback(() => {
    urls.reverse();
    setAudioUrl(urls[0]);
  }, [urls]);

  // Render the wavesurfer component
  // and a button to load a different audio file
  return (
    <>
      <div className="flex gap-10">
        <OctavesSelector
          value={octaves}
          onChange={(e) => setOctaves(e)}
          size="md"
        />
        <Piano synth={synth} octaves={octaves} />
      </div>
      <div>
        <WaveSurferPlayer
          height={100}
          waveColor="rgb(200, 0, 200)"
          progressColor="rgb(100, 0, 100)"
          url={audioUrl}
          plugins={[TimelinePlugin.create()]}
        />

        <TheButton onClick={onUrlChange}>Change audio</TheButton>
      </div>
    </>
  );
}

export default Lab;
