import { Subject } from "rxjs";
import { throttleTime, groupBy, mergeMap } from "rxjs/operators";

const EVENTS_TIME_BUFFER = 200; // only one or less event in this amount of milliseconds
                                // will be send out in one shard. this helps to reduce
                                // stress on MIDI interface and prevent glitches when
                                // notes are skipped, etc.
const outputMidi = (midiOut, data) => {
  console.log("Output MIDI message:", data.message, midiOut);
  midiOut.send(0xf0, data.message);
}

const midiBridge = (midiOut) => {
  const subject = new Subject();

  subject.pipe(
    groupBy(event => event.shard),
    mergeMap(shard$ =>
      shard$.pipe(
        throttleTime(EVENTS_TIME_BUFFER, undefined, { leading: true, trailing: true })
      )
    )
  ).subscribe(outputMidi.bind(this, midiOut));

  return subject;
}

export default midiBridge;
