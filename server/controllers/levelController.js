import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import zod from "zod";
import { PythonShell } from 'python-shell';

// const levelSchema = zod.object({
//     YearsOfExperience: zod.number(),
//     FamilarityWithConcept: zod.string(),
//     techStack: zod.string()
// });

const levelPredict = asyncHandler(async (req, res) => {
    try {
        const { YearsOfExperience, FamilarityWithConcept, techStack } = req.body;
        console.log(YearsOfExperience, FamilarityWithConcept, techStack);

        let pyshell = new PythonShell('utils/p.py');

        pyshell.send('hello');

        let newData = {
            "Years of Experience": YearsOfExperience,
            "Familiarity with Concepts": FamilarityWithConcept
        };

        let newDataJson = JSON.stringify(newData);


        pyshell.send(newDataJson);

        let predictedLevel = '';


        pyshell.on('message', function (message) {
            try {
                const parsedMessage = JSON.parse(message);
                predictedLevel = parsedMessage.predicted_level;
            } catch (error) {

                console.error('Error parsing JSON message:', error);
            }
        });

        pyshell.end(function (err, code, signal) {
            if (err) {
                console.error('PythonShell end error:', err);
                throw err;
            }

            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log('finished');

            res.status(200).json({
                success: true,
                message: "Data received",
                data: {
                    predictedLevel: predictedLevel,
                    techStack: techStack
                }
            });
        });
    } catch (error) {
        throw new ApiError(error.message);
    }
});

export { levelPredict };
