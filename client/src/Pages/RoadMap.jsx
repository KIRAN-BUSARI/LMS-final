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
                if (level === 'Beginner') {
                    setRoadmapImage(webDevBeginner);
                } else if (level === 'Intermediate') {
                    setRoadmapImage(webDevIntermediate);
                } else if (level === 'Advanced') {
                    setRoadmapImage(webDevAdvanced);
                }
                break;
            case 'ml':
                if (level === 'Beginner') {
                    setRoadmapImage(mlBeginner);
                } else if (level === 'Intermediate') {
                    setRoadmapImage(mlIntermediate);
                } else if (level === 'Advanced') {
                    setRoadmapImage(mlAdvanced);
                }
                break;
            default:
                setRoadmapImage(null);
                break;
        }
    }, [level, techStack])
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