import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import zod, { string } from "zod";
import { PythonShell } from 'python-shell';
import * as fs from 'fs';

const levelSchema = zod.object({
    YearsOfExperience: zod.number(),
    FamilarityWithConcept: zod.string(),
    techStack: zod.string()
})

const levelPredict = asyncHandler(async (req, res) => {
    try {
        const { YearsOfExperience, FamilarityWithConcept, techStack } = req.body;
        // console.log(YearsOfExperience);
        // console.log(FamilarityWithConcept);
        let pyshell = new PythonShell('utils/p.py');

        // Send a message to the Python script
        pyshell.send('hello');

        // Define the new data
        let newData = {
            "Years of Experience": YearsOfExperience,
            "Familiarity with Concepts": FamilarityWithConcept
        };

        // Convert the new data to a JSON string
        let newDataJson = JSON.stringify(newData);
        // console.log("DAta", newDataJson);
        // Send the new data to the Python script
        pyshell.send(newDataJson);

        let responseMessages = []
        pyshell.on('message', function (message) {
            responseMessages.push(message)
        });
        // const res = JSON.parse(responseMessages[2])


        // end the input stream and allow the process to exit
        pyshell.end(function (err, code, signal) {
            if (err) throw err;
            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log('finished');
            // res.status(200).json(new ApiResponse(200, JSON.parse(responseMessages[2]), "Predicted Successfully"))
            const data = JSON.parse(responseMessages[2])
            res.status(200).json({
                success: true,
                message: "Data received",
                data: {
                    data,
                    techStack
                }
            })
        });
    } catch (error) {
        throw new ApiError(error.message)
    }
})

const getPredict = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        console.log(error.message);
    }
})
export { levelPredict }





// const levelPredict = asyncHandler(async (req, res) => {
//     try {
//         const { YearsOfExperience, FamilarityWithConcept } = req.body;
//         // console.log(YearsOfExperience);
//         // console.log(FamilarityWithConcept);
//         let pyshell = new PythonShell('utils/p.py');

//         // Send a message to the Python script
//         pyshell.send('hello');

//         // Define the new data
//         let newData = {
//             "Years of Experience": YearsOfExperience,
//             "Familiarity with Concepts": FamilarityWithConcept
//         };

//         // Convert the new data to a JSON string
//         let newDataJson = JSON.stringify(newData);
//         // console.log("DAta", newDataJson);
//         // Send the new data to the Python script
//         pyshell.send(newDataJson);

//         let responseMessages = []; // Array to store messages from Python script

//         pyshell.on('message', function (message) {
//             // Store the message
//             responseMessages.push(message);
//         });

//         // When the Python script finishes, send the accumulated messages as a response
//         pyshell.end(function (err, code, signal) {
//             if (err) {
//                 // Handle errors
//                 throw new ApiError(err.message);
//             }
//             console.log('The exit code was: ' + code);
//             console.log('The exit signal was: ' + signal);
//             console.log('finished');

//             // Send the accumulated messages as a single response
//             res.status(200).json({ messages: responseMessages[2], success: true });
//         });
//     } catch (error) {
//         // Handle errors
//         throw new ApiError(error.message);
//     }
// });

// export { levelPredict }