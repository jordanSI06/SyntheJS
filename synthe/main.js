window.AudioContext = window.AudioContext || window.webkitAudioContext;


var context = new AudioContext();
var nexusGain = Nexus.context.createGain();
var masterGain = context.createGain();
var nodes = [];

var keyboard = new QwertyHancock({
    id: 'keyboard',
    width: 520,
    height: 125,
    octave: 2,
    startNote: 'C3',
    whiteNotesColour: 'white',
    blackNotesColour: 'black',
    hoverColour: '#f3e939'
});

var osci = new Nexus.Oscilloscope('#osci', {
    'size': [120, 30]
});

var sine = document.getElementById("sine");
var triangle = document.getElementById("triangle");
var square = document.getElementById("square");
var saw = document.getElementById("saw");

masterGain.value = 0.3;
masterGain.connect(context.destination);

keyboard.keyDown = function (note, frequency) {
    var osc = context.createOscillator();
    osc.type= 'square'
    osc.frequency.value = frequency;
    osc.connect(masterGain);
    osc.start(0);

    nodes.push(osc);
}

keyboard.keyUp = function (note, frequency) {
    var new_nodes = [];

    for (var i = 0; i < nodes.length; i++) {
        if (Math.round(nodes[i].frequency.value) === Math.round(frequency)) {
            nodes[i].stop(0);
            nodes[i].disconnect();
        } else {
            new_nodes.push(nodes[i]);
        }
    }

    nodes = new_nodes;
};
