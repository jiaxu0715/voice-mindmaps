

//MINDMAP
var mind = {
    "meta": {
        'name': 'example',
        'version': '1'
    },
    'format': 'node_array',
    'data': []
};
var options = {
    container: 'jsmind_container',
    theme: 'success',
    editable: true,
};

var jm = new jsMind(options);



function appendRoot(main) {
    //console.log (topic);
    mind.data.push({ "id": 'root', 'isroot': true, "topic": main });
    jm.show(mind);
}

function appendNode(topic) {
    //console.log (topic);
    mind.data.push({ "id": topic, 'parentid': 'root', "topic": topic });
    jm.show(mind);
}
appendRoot ("Programming");
annyang.addCallback('result', function(phrases) {
    console.log("I think the user said: ", phrases[0]);
    console.log("But then again, it could be any of the following: ", phrases);
    document.getElementById("results").innerHTML = "What's being heard: " + phrases;
  });

//VOICE COMMANDS
if (annyang) {

    const commands = {
        '(the) main idea is *main': appendRoot,
        '(add) new idea *topic': appendNode,
        'Append node *topic': appendNode,
        'New node *topic': appendNode,
        //'New idea adding on to '
        //for testing December 8th
        'Hello': () => { alert('Hello there! Did you say something?') },
    };

    // Add our commands to annyang
    annyang.addCommands(commands);
    // Start listening.
    SpeechKITT.annyang();

    // Define a stylesheet for KITT to use
    SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat-midnight-blue.css');

    // Render KITT's interface
    SpeechKITT.vroom();
}
