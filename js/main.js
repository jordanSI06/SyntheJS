var synth = new Nexus.Piano('#synth', {
    'size': [500,125],
    'mode': 'button', //change parameter with 'button', 'toggle' or 'impulse'
    'lowNote': 24,
    'highNote': 60
});

synth.on('change', function(v) {
    console.log (v);
})



