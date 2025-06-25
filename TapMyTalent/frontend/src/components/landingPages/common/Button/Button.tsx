import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

interface ButtonProps {
    text: string;
    to: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, to, className = '' }) => {
    return (
        <Link to={to} className={`custom-button ${className}`}>
            {text}
        </Link>
    );
};

export default Button;
