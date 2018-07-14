var audio_context = window.AudioContext || window.webkitAudioContext; //depending of device
var con = new audio_context();


Nexus.context = con;

var osci = new Nexus.Oscilloscope('#osci',{
    'size': [175, 75]
});

var synth = new Nexus.Piano('#synth', {
    'size': [500,125],
    'mode': 'button', //change parameter with 'button', 'toggle' or 'impulse'
    'lowNote': 24,
    'highNote': 49
});

var sine=document.getElementById("sine");
var triangle=document.getElementById("triangle");
var square=document.getElementById("square");
var saw=document.getElementById("saw");

var midi_to_freq ={
    24: 261.63,
    25: 277.18,
    26: 293.66,
    27: 311.13,
    28: 329.63,
    29: 349.23,
    30: 369.99,
    31: 392,
    32: 415.30,
    33: 440,
    34: 466.16,
    35: 493.88,
    36: 523.25,
    37: 554.37,
    38: 587.33,
    39: 622.25,
    40: 659.26,
    41: 698.46,
    42: 739.99,
    43: 783.99,
    44: 830.61,
    45: 880,
    46: 932.33,
    47: 987.77,
    48: 1046.50
};

synth.on('change', function Note(data) {
    var osc = Nexus.context.createOscillator();
    var amp = Nexus.context.createGain();
    var now = Nexus.context.currentTime; //Timer of program
    amp.gain.value = 0; // 0.05 to have smooth sound
    amp.gain.linearRampToValueAtTime(0.05, now + 2); //increase amp.gain.valiue (0) to 0.1 after 2 sec
    amp.gain.linearRampToValueAtTime(0, now + 4.1); //increase amp.gain.valiue (0.1) to 0 after 4 sec
    osc.connect(amp);
    osci.connect(amp); //Visualize the wave
    
    if(sine.checked == true){
        osc.type='sine';
    }
    else if(triangle.checked == true){
        osc.type='triangle';
    }
    else if(square.checked == true){
        osc.type='square';
    }
    else if(saw.checked == true){
        osc.type='sawtooth';
    }
    else{
        alert("Erreur. Aucun type selectionné");
    }
    
    amp.connect(con.destination);
    osc.start();
    osc.stop(now +4.1); //just after the end of ramp
    osc.frequency.value= midi_to_freq[data.note]
    console.log (data);
})



