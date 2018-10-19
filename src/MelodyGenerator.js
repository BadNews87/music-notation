const durations = require('./durations.js');
const MelodyQueue = require('./MelodyQueue.js');
const waveGenerator = require('./WaveGenerator.js');
const StringParser = require('./StringParser.js');
const note = require('./note.js');

class MelodyGenerator
{
    fromString(melodyString) {
        // put your code here
        const stringParser = new StringParser(melodyString);
        const steps = stringParser.parse();
        let melody = new MelodyQueue();
        steps.forEach( step => {
            const duration = step.duration;
            if(step.note){
                melody.enqueueTone(durations[duration], note(step.note));
            }else{
                melody.enqueuePause(durations[duration]);
            }
        })
        
        return melody;
    }

    getNotesArray(notes) {
        return notes.map((n) => note(n));
    }
}

module.exports = new MelodyGenerator();
