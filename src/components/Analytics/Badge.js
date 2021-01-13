import React from 'react'
import { faChartLine, faEnvelope, faUserCircle, faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Badge(props) {
    const {header, p, color, id} = props
    const icon = id === 0 ? faChartLine : id === 1 ? faEnvelope : id === 2 ? faUserCircle : faGlobeAmericas
    return (
        <div className="classGrid">
            <div className={`circle black`} style={{ backgroundColor : color }}>
                <FontAwesomeIcon icon={icon} size="4x" style={{ color: '#ecf0f1' }} />
            </div>
            <div>
                <h2>{header}</h2>
                <p>{p}</p>
            </div>
            
        </div>
        
    )
}

export default Badge
