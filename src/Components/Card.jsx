import React from 'react';

const Card = ({value, name, color}) => {
    
    
    return (
        <div >
            <div className="card">
                <p>{name}</p>
                <h1 className={color}>{value}</h1>
            </div>
            
        </div>
    );
};

export default Card;