// // import { ApiResponse } from "../utils/ApiResponse.js";
// // import { ApiError } from "../utils/ApiError.js";
// // import { asyncHandler } from "../utils/asyncHandler.js";
// // import zod, { string } from "zod";
// // import { PythonShell } from 'python-shell';
// // import * as fs from 'fs';

// // const levelSchema = zod.object({
// //     YearsOfExperience: zod.number(),
// //     FamilarityWithConcept: zod.string(),
// //     techStack: zod.string()
// // })

// // const levelPredict = asyncHandler(async (req, res) => {
// //     try {
// //         const { YearsOfExperience, FamilarityWithConcept, techStack } = req.body;
// //         // console.log(YearsOfExperience);
// //         // console.log(FamilarityWithConcept);
// //         let pyshell = new PythonShell('utils/p.py');
// //         // Send a message to the Python script
// //         pyshell.send('hello');

// //         // Define the new data
// //         let newData = {
// //             "Years of Experience": YearsOfExperience,
// //             "Familiarity with Concepts": FamilarityWithConcept
// //         };

// //         // Convert the new data to a JSON string
// //         let newDataJson = JSON.stringify(newData);
// //         // console.log("DAta", newDataJson);
// //         // Send the new data to the Python script
// //         pyshell.send(newDataJson);

// //         let responseMessages = []
// //         pyshell.on('message', function (message) {
// //             console.log(message);
// //             responseMessages.push(message)

// //         });
// //         // const res = JSON.parse(responseMessages[2])

// //         // end the input stream and allow the process to exit
// //         pyshell.end(function (err, code, signal) {
// //             if (err) throw err;
// //             console.log('The exit code was: ' + code);
// //             console.log('The exit signal was: ' + signal);
// //             console.log('finished');
// //             // res.status(200).json(new ApiResponse(200, JSON.parse(responseMessages[2]), "Predicted Successfully"))
// //             const resp = JSON.parse(responseMessages[2])
// //             res.status(200).json({
// //                 success: true,
// //                 message: "Data received",
// //                 data: {
// //                     resp,
// //                     techStack
// //                 }
// //             })
// //         });
// //     } catch (error) {
// //         throw new ApiError(error.message)
// //     }
// // })

// // const getPredict = asyncHandler(async (req, res) => {
// //     try {

// //     } catch (error) {
// //         console.log(error.message);
// //     }
// // })
// // export { levelPredict }





// // // const levelPredict = asyncHandler(async (req, res) => {
// // //     try {
// // //         const { YearsOfExperience, FamilarityWithConcept } = req.body;
// // //         // console.log(YearsOfExperience);
// // //         // console.log(FamilarityWithConcept);
// // //         let pyshell = new PythonShell('utils/p.py');

// // //         // Send a message to the Python script
// // //         pyshell.send('hello');

// // //         // Define the new data
// // //         let newData = {
// // //             "Years of Experience": YearsOfExperience,
// // //             "Familiarity with Concepts": FamilarityWithConcept
// // //         };

// // //         // Convert the new data to a JSON string
// // //         let newDataJson = JSON.stringify(newData);
// // //         // console.log("DAta", newDataJson);
// // //         // Send the new data to the Python script
// // //         pyshell.send(newDataJson);

// // //         let responseMessages = []; // Array to store messages from Python script

// // //         pyshell.on('message', function (message) {
// // //             // Store the message
// // //             responseMessages.push(message);
// // //         });

// // //         // When the Python script finishes, send the accumulated messages as a response
// // //         pyshell.end(function (err, code, signal) {
// // //             if (err) {
// // //                 // Handle errors
// // //                 throw new ApiError(err.message);
// // //             }
// // //             console.log('The exit code was: ' + code);
// // //             console.log('The exit signal was: ' + signal);
// // //             console.log('finished');

// // //             // Send the accumulated messages as a single response
// // //             res.status(200).json({ messages: responseMessages[2], success: true });
// // //         });
// // //     } catch (error) {
// // //         // Handle errors
// // //         throw new ApiError(error.message);
// // //     }
// // // });

// // // export { levelPredict }





// import { ApiResponse } from "../utils/ApiResponse.js";
// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import zod from "zod";
// import { PythonShell } from 'python-shell';

// const levelSchema = zod.object({
//     YearsOfExperience: zod.number(),
//     FamilarityWithConcept: zod.string(),
//     techStack: zod.string()
// })

// const levelPredict = asyncHandler(async (req, res) => {
//     try {
//         const { YearsOfExperience, FamilarityWithConcept, techStack } = req.body;

//         // Create a new PythonShell instance
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

//         // Send the new data to the Python script
//         pyshell.send(newDataJson);

//         let predicted_level = []
//         let predictedLevel
//         // Listen for messages from the Python script
//         pyshell.on('message', function (message) {
//             // console.log("Data", message);
//             predicted_level.push(message);
//             console.log(predicted_level);
//             console.log("Level", predicted_level);
//             predictedLevel = predicted_level;
//             // const predictedLevel = JSON.parse(predicted_level);
//         });

//         // When the Python script finishes, handle the response
//         pyshell.end(function (err, code, signal) {
//             if (err) throw err;

//             console.log('The exit code was: ' + code);
//             console.log('The exit signal was: ' + signal);
//             console.log('finished');

//             // Extract the predicted level from the response


//             // Send the predicted level in the response
//             res.status(200).json({
//                 success: true,
//                 message: "Data received",
//                 data: {
//                     predictedLevel,
//                     techStack
//                 }
//             });
//         });
//     } catch (error) {
//         throw new ApiError(error.message)
//     }
// })

// export { levelPredict }



import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import zod from "zod";
import { PythonShell } from 'python-shell';

const levelSchema = zod.object({
    YearsOfExperience: zod.number(),
    FamilarityWithConcept: zod.string(),
    techStack: zod.string()
});

const levelPredict = asyncHandler(async (req, res) => {
    try {
        const { YearsOfExperience, FamilarityWithConcept, techStack } = req.body;

        // Create a new PythonShell instance
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

        // Send the new data to the Python script
        pyshell.send(newDataJson);

        let predictedLevel = ''; // Initialize predictedLevel

        // Listen for messages from the Python script
        pyshell.on('message', function (message) {
            try {
                const parsedMessage = JSON.parse(message); // Parse the received message
                predictedLevel = parsedMessage.predicted_level; // Extract predicted_level
            } catch (error) {
                // Handle JSON parsing error
                console.error('Error parsing JSON message:', error);
            }
        });

        // When the Python script finishes, handle the response
        pyshell.end(function (err, code, signal) {
            if (err) {
                // Handle PythonShell end error
                console.error('PythonShell end error:', err);
                throw err;
            }

            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log('finished');

            // Send the predicted level and tech stack in the response
            res.status(200).json({
                success: true,
                message: "Data received",
                data: {
                    predictedLevel: predictedLevel, // Send predictedLevel
                    techStack: techStack // Send techStack
                }
            });
        });
    } catch (error) {
        // Catch any other errors
        throw new ApiError(error.message);
    }
});

export { levelPredict };
