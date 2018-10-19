const StringParser = require('../src/StringParser');
const exampleString = 'play note(B6, H)'

    test('parse() should return array of steps', () => {
        const stringParser = new StringParser(exampleString);
        expect(stringParser.parse()).toEqual([{duration: 'H', note: 'B6'}]);
    });


