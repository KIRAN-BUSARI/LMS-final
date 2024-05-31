import React, { useState } from 'react';
import axiosInstance from "../../Helper/axiosInstance";
import Roadmap from '../RoadMap';

function RoadMap() {
    const [YearsOfExperience, setYearsOfExperience] = useState(0);
    const [FamilarityWithConcept, setFamiliarityWithConcept] = useState("");
    const [techStack, setTechStack] = useState('ml');
    const [level, setLevel] = useState('')
    const handleSubmit = async () => {
        try {
            const res = await axiosInstance.post("/level/predict",
                {
                    YearsOfExperience: Number(YearsOfExperience),
                    FamilarityWithConcept: FamilarityWithConcept,
                    techStack: techStack
                }
            )
            // console.log(res);
            // console.log(res.data.data.predictedLevel);
            setLevel(res.data.data.predictedLevel)
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-900">
            <h1 className="text-3xl font-bold">Roadmap Questionnaires</h1>
            <label htmlFor="familiarityWithConcept">
                Familiarity with Concept
            </label>
            <input
                value={FamilarityWithConcept}
                type="text"
                id="familiarityWithConcept"
                placeholder='Familiarity with Concept'
                onChange={(e) => setFamiliarityWithConcept(e.target.value)}
                className='px-3 py-2 rounded-md bg-white text-black'
            />
            <label htmlFor="familiarityWithConcept">
                Year of experience
            </label>
            <input
                value={YearsOfExperience}
                type="number"
                id="YearsOfExperience"
                placeholder='Years Of Experience'
                onChange={(e) => setYearsOfExperience(e.target.value)}
                className='px-3 py-2 rounded-md bg-white text-black'
            />
            <label htmlFor="techStack">
                Tech Stack
            </label>
            <input
                value={techStack}
                type="text"
                id="techStack"
                placeholder='Tech Stack'
                onChange={(e) => setTechStack(e.target.value)}
                className='px-3 py-2 rounded-md bg-white text-black'
            />
            <button onClick={handleSubmit} className='px-3 py-2 bg-[#0095ff] text-white mt-4 w-52 rounded-lg'>Submit
            </button>
            <div className="">
                <Roadmap techStack={techStack} level={level} />
            </div>
        </div>
    );
}

export default RoadMap;
