var audio_context = window.AudioContext || window.webkitAudioContext; //depending of device
var con = new audio_context();

var osci = new Nexus.Oscilloscope('#osci',{
    'size': [120, 30]
});

var synth = document.querySelector("#synth")


var sine=document.getElementById("sine");
var triangle=document.getElementById("triangle");
var square=document.getElementById("square");
var saw=document.getElementById("saw");

var midi_to_freq ={
    0: 261.63,
    1: 277.18,
    2: 293.66,
    3: 311.13,
    4: 329.63,
    5: 349.23,
    6: 369.99,
    7: 392,
    8: 415.30,
    9: 440,
    10: 466.16,
    11: 493.88,
    12: 523.25,
    13: 554.37,
    14: 587.33,
    15: 622.25,
    16: 659.26,
    17: 698.46,
    18: 739.99,
    19: 783.99,
    20: 830.61,
    21: 880,
    22: 932.33,
    23: 987.77,
    24: 1046.50
};

var volume = document.querySelector('#volume');
volume.addEventListener('input', function(e){
    console.log("Volume: " + e.target.value);
})

var qfactor = document.querySelector('#qfactor');
qfactor.addEventListener('input', function(e){
    console.log("Qfactor: " + e.target.value);
})

synth.addEventListener('change', function Note(data) {
    var osc = con.createOscillator();
    var amp = con.createGain();
    var now = con.currentTime; //Timer of program
    amp.gain.value = 0.3; // 0.05 to have smooth sound
    amp.gain.linearRampToValueAtTime(0.3, now + 0.3); //increase amp.gain.valiue (0) to 0.1 after 2 sec
    amp.gain.linearRampToValueAtTime(0, now + 0.5); //increase amp.gain.valiue (0.1) to 0 after 4 sec
    osc.connect(amp);
   
    
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
        console.log("Erreur. Aucun type selectionné");
    }
    
    amp.connect(con.destination);
        osc.start();
        osc.stop(now +0.5); //just after the end of ramp
   console.log (data.note);
    osc.frequency.value= midi_to_freq[data.note[1]]
    console.log(osc.frequency.value);
})


