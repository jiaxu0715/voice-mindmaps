

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



function createRoot(main) {
    mind.data.push({ "id": 'root', 'isroot': true, "topic": main });
    jm.show(mind);
}

function appendNode(topic) {
    //console.log (topic);
    mind.data.push({ "id": topic, 'parentid': 'root', "topic": topic });
    jm.show(mind);
    console.log(mind.data);
}
createRoot ("Start by saying your main idea");
annyang.addCallback('result', function(phrases) {
    console.log("I think the user said: ", phrases[0]);
    console.log("But then again, it could be any of the following: ", phrases);
    document.getElementById("results").innerHTML = "What's being heard: " + phrases; //showing what's being said on the page
  });

//VOICE COMMANDS
if (annyang) {

    const commands = {
        //Adding the root node
        '(the) main idea (is) *main': createRoot,
        'Start from (the idea) *main': createRoot,
        'The main thing is *main': createRoot,
        '(the) center idea is *main': createRoot,
        //Adding second layer nodes
        '(add) new idea *topic': appendNode,
        'This connects to *topic': appendNode,
        'New node *topic': appendNode,
        'From there add': appendNode,
        //Deleting Nodes
        'Delete (what I just wrote)': deleteNode,
        'I take back what I just said': deleteNode,
        'Undo': deleteNode,
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
