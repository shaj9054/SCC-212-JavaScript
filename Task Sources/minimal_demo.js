// task 1 and 2 work
// task 3 creates a stack overflow :(

"use strict";

const testlib = require('./testlib.js');

let currSequence = '';
let pattern = [];

//Track the frequency counts
let freqCount = {};


testlib.on('ready', function(patternIn) {

    pattern = patternIn;
    console.log("Patterns:", pattern);

    //Initialise the count per pattern
    pattern.forEach(pattern => {
        freqCount[pattern] = 0;
    });
    testlib.runTests();

});

testlib.on('data', function(data) {

    currSequence = currSequence + data

});

testlib.on('reset', function () {

    const patternCountsAndMatches = (pattern, index) => {
        if (index + pattern.length > currSequence.length) return 0;

        let count = 0;
        if (checkPatternMatch(currSequence, pattern, index)) {
            count = 1;
            testlib.foundMatch(pattern, index);
        }
        //Return num of matches
        return count + patternCountsAndMatches(pattern, index + 1);

    };

    //Update count per pattern recursively 
    const updateCounts = (patterns) => {

        if (patterns.length === 0) return;
        const pattern = patterns[0];

        //Num of pattern occurence
        freqCount[pattern] = patternCountsAndMatches(pattern, 0);
        updateCounts(patterns.slice(1));

    }

    updateCounts(pattern);

    testlib.frequencyTable(freqCount);
    currSequence = '';


    //Reset count per sequence
    Object.keys(freqCount).forEach(key => {
        freqCount[key] = 0;

    });
});

function symbolMatches(letter, nucleotide) {

    //Change map of unset sequences
    const nucleotideMap = {
        'A': ['A'],
        'C': ['C'],
        'G': ['G'],
        'T': ['T'],
        'R': ['A', 'G'],
        'Y': ['C', 'T'],
        'K': ['G', 'T'],
        'M': ['A', 'C'],
        'S': ['C', 'G'],
        'W': ['A', 'T'],
        'B': ['C', 'G', 'T'],
        'D': ['A', 'G', 'T'],
        'H': ['A', 'C', 'T'],
        'V': ['A', 'C', 'G'],
        'N': ['A', 'C', 'G', 'T']
    };

    return nucleotideMap[letter].includes(nucleotide);

}


const patternCountsAndMatches = (pattern, index = 0, count = 0) => {

    if (index + pattern.length > currSequence.length) {
        freqCount[pattern] += count;
        return;
    }

    if (checkPatternMatch(currSequence, pattern, index)) {
        count = count + 1;
        testlib.foundMatch(pattern, index);
    }

    setTimeout(() => patternCountsAndMatches(pattern, index + 1, count), 0);

};


function checkPatternMatch(seq, pattern, seqIndex) {
    if (seqIndex + pattern.length > seq.length) 
    return false; 

    let sequencePart = seq.substring(seqIndex, seqIndex + pattern.length);
    let sequenceArray = sequencePart.split('');
    let patternArray = pattern.split('');

    return patternArray.every((char, index) => symbolMatches(char, sequenceArray[index]));
}


testlib.on('end', function () {

    function processPattern(pattern, index = 0, count = 0) {
        if (index > currSequence.length - pattern.length) {
            freqCount[pattern] = count; 
            processNextPattern();
            return;
        }

        if (checkPatternMatch(currSequence, pattern, index)) {
            count = count + 1;
            testlib.foundMatch(pattern, index);
        }

        setTimeout(() => processPattern(pattern, index + 1, count), 0);
    }

    let currPatternIndx = 0;

    function processNextPattern() {
        if (currPatternIndx >= pattern.length) {
            testlib.frequencyTable(freqCount);

            //Reset buffer per sequence
            currSequence = '';
            Object.keys(freqCount).forEach(key => freqCount[key] = 0);
            return;
        }

        processPattern(pattern[currPatternIndx]);
        currPatternIndx++;
    }

    processNextPattern();

});

testlib.setup(2);