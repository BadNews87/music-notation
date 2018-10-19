class StringParser {
    constructor(string) {
        this.string = string.trim();
        this.steps = [];
        this.makros = {};
    }

    parse() {
        const lines = this.string.match(/^.*/gm);
        const playRegex = /^play/;
        const defineRegex = /^define/;
        lines.forEach(line => {
            if (defineRegex.test(line)) {
                line = line.replace(defineRegex, '').trim();
                this.encodeDefine(line);
            } else {
                line = line.replace(playRegex, '').trim();
                this.encodePlay(line);
            }
        });
        return this.steps;
    }

    encodePlay(line) {
        console.log('asdasdsadasdasdas', line);
        const commandRegex = /^(pause|note|repeat)/;
        const steps = line.split('|').map(item => item.trim());
        const stepRegex = /\(.*\)/;
        steps.forEach(step => {
            const command = (step.match(commandRegex) || [])[0];
            switch (command) {
                case 'note':
                case 'pause':
                    const params = step.match(stepRegex)[0].replace(/(\(|\))/gm, '').split(',');
                    this.encodeStep(params[0], params[1]);
                    break;
                case 'repeat':
                    let cmd = step.replace(command, '').trim();
                    const repeatCount = parseInt(cmd[0]);
                    cmd = cmd.replace(`${cmd[0]} times `, '').trim();
                    for (let i = 0; i < repeatCount; i++) {
                        this.encodePlay(cmd);
                    };
                    break;
                default:
                if(this.makros[step]){
                    this.encodePlay(this.makros[step]);
                }
                    break;
            }
        })

    }
    encodeDefine(line) {
        const keyRegex = /^[\w\d]*/;
        const key = line.match(keyRegex)[0];
        line = line.replace(key, '').trim().replace('is ', '');
        const steps = line.trim();
        this.makros[key] = steps;
    }
    encodeStep(note, duration) {
        duration = duration && duration.trim()
        this.steps.push({
            duration,
            note
        });
    }

};

module.exports = StringParser;