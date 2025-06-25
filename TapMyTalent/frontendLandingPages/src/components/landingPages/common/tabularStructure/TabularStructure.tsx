import React from "react";
import "./TabularStructure.css";

interface Step {
    title: string;
    description: string[];
}

interface TabularStructureProps {
    steps: Step[]; 
}

const TabularStructure: React.FC<TabularStructureProps> = ({ steps }) => {
    return (
        <div className="tabular-structure">
            <div className="steps-grid">
                <div className="vertical-line"></div>
                {steps.map((step, index) => (
                    <div 
                        key={step.title} 
                        className={`step-item ${index % 2 === 0 ? 'left-step' : 'right-step'}`}
                    >
                        <h3 className="step-title">{step.title}</h3>
                        <ul className="step-description-list">
                            {step.description.map((desc, idx) => (
                                <li key={idx} className="step-description-item">
                                    {desc}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabularStructure;
