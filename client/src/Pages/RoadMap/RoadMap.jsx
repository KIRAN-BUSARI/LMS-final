// import React, { useState } from 'react'
// import axiosInstance from "../../Helper/axiosInstance"
// function RoadMap() {
//     const [year, setYear] = useState('');
//     const [familiraty, setFamilarity] = useState("");
//     const [stack, setStack] = useState("");

//     const handleSubmit = async () => {
//         const res = await axiosInstance.post("/level/predict", {
//             year, familiraty, stack
//         })
//         console.log(res);
//     }
//     return (
//         <div className="h-screen flex flex-col items-center justify-center bg-slate-900">
//             <h1 className="text-3xl font-bold">Roadmap Questionaries</h1>
//             <label htmlFor="yearOfExperience" className='text-left'>
//                 Year Of Experience
//             </label>
//             <input type="text" placeholder='YearOfExperience' className='px-3 py-2 rounded-md bg-white text-black' onChange={setYear} />
//             <label htmlFor="">
//                 Familarity with Concept
//             </label>
//             <input type="text" name="" id="" placeholder='Familarity with Concept' onChange={setFamilarity} className='px-3 py-2 rounded-md bg-white text-black' />
//             <label htmlFor="TechStack">
//                 TechStack
//             </label>
//             <input type="text" name="" id="" placeholder='TechStack' onChange={setStack} className='px-3 py-2 rounded-md bg-white text-black' />
//             <button onClick={handleSubmit} className='px-3 py-2 bg-[#0095ff] text-white mt-4 w-52 rounded-lg'>Submit</button>
//         </div>
//     )
// }

// export default RoadMap




import React, { useState } from 'react';
import axiosInstance from "../../Helper/axiosInstance";

function RoadMap() {
    const [YearsOfExperience, setYear] = useState('');
    const [FamilarityWithConcept, setFamilarity] = useState('');
    const [techStack, setStack] = useState('');

    const handleSubmit = async () => {
        try {
            const res = await axiosInstance.post("/level/predict", {
                YearsOfExperience, FamilarityWithConcept, techStack
            });
            console.log(res);
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-900">
            <h1 className="text-3xl font-bold">Roadmap Questionnaires</h1>
            <label htmlFor="yearOfExperience" className='text-left'>
                Year Of Experience
            </label>
            <input
                type="text"
                placeholder='Year Of Experience'
                className='px-3 py-2 rounded-md bg-white text-black'
                onChange={(e) => setYear(e.target.value)}
            />
            <label htmlFor="familarityWithConcept">
                Familiarity with Concept
            </label>
            <input
                type="text"
                name="familarityWithConcept"
                id="familarityWithConcept"
                placeholder='Familiarity with Concept'
                onChange={(e) => setFamilarity(e.target.value)}
                className='px-3 py-2 rounded-md bg-white text-black'
            />
            <label htmlFor="techStack">
                Tech Stack
            </label>
            <input
                type="text"
                name="techStack"
                id="techStack"
                placeholder='Tech Stack'
                onChange={(e) => setStack(e.target.value)}
                className='px-3 py-2 rounded-md bg-white text-black'
            />
            <button onClick={handleSubmit} className='px-3 py-2 bg-[#0095ff] text-white mt-4 w-52 rounded-lg'>Submit</button>
        </div>
    );
}

export default RoadMap;
