
import ollama from 'ollama'
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
let modelResponse = ""

const chatConfig = ({
    model: "llama2",
    role: "user",
    content: ""
})

const ask = asyncHandler(async (req, res) => {
    try {
        const question = req.body.question.trim()
        const response = await invoke(question)
        res.status(200).json({
            success: true,
            message: "Response fetched successfully",
            response
        })


    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to fetch response"
        })
    }
})

async function invoke(question) {
    console.log(`-----`)
    console.log(`[${chatConfig.model}]: ${question}`)
    console.log(`-----`)
    try {
        console.log(`Running prompt...`)
        const response = await ollama.chat({
            model: chatConfig.model,
            messages: [{ role: chatConfig.role, content: question }],
        })
        console.log(`${response.message.content}\n`)
        modelResponse = response.message.content
        return modelResponse
    }
    catch (error) {
        console.log(`Query failed!`)
        console.log(error)
    }
}

export { ask }