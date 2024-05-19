import { PythonShell } from 'python-shell';
import * as fs from 'fs';

let pyshell = new PythonShell('./p.py');

// Send a message to the Python script
pyshell.send('hello');

// Define the new data
let newData = {
    "Years of Experience": 5,
    "Familiarity with Concepts": "High"
};

// Convert the new data to a JSON string
let newDataJson = JSON.stringify(newData);

// Send the new data to the Python script
pyshell.send(newDataJson);

pyshell.on('message', function (message) {
    // received a message sent from the Python script
    console.log(message);
});

// end the input stream and allow the process to exit
pyshell.end(function (err, code, signal) {
    if (err) throw err;
    console.log('The exit code was: ' + code);
    console.log('The exit signal was: ' + signal);
    console.log('finished');
});
