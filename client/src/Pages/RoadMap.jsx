import React, { useState, useEffect } from 'react';

import webDevBeginner from '../Assets/RoadmapImg/webDevBeginner.png';
import webDevIntermediate from '../Assets/RoadmapImg/webDevIntermediate.png';
import webDevAdvanced from '../Assets/RoadmapImg/webDevAdvanced.png';
import mlBeginner from '../Assets/RoadmapImg/mlBeginner.png';
import mlIntermediate from '../Assets/RoadmapImg/mlIntermediate.png';
import mlAdvanced from '../Assets/RoadmapImg/mlAdvanced.png';

const Roadmap = ({ techStack, level }) => {
    const [roadmapImage, setRoadmapImage] = useState(null);

    useEffect(() => {
        switch (techStack) {
            case 'web development':
                if (level === 'beginner') {
                    setRoadmapImage(webDevBeginner);
                } else if (level === 'intermediate') {
                    setRoadmapImage(webDevIntermediate);
                } else if (level === 'advanced') {
                    setRoadmapImage(webDevAdvanced);
                }
                break;
            case 'ml':
                if (level === 'beginner') {
                    setRoadmapImage(mlBeginner);
                } else if (level === 'intermediate') {
                    setRoadmapImage(mlIntermediate);
                } else if (level === 'advanced') {
                    setRoadmapImage(mlAdvanced);
                }
                break;
            default:
                setRoadmapImage(null);
                break;
        }
    }, [techStack, level]);

    return (
        <div>
            {roadmapImage ? (
                <img src={roadmapImage} alt={`${techStack} ${level} roadmap`} />
            ) : (
                <p>No roadmap available</p>
            )}
        </div>
    );
};

export default Roadmap;