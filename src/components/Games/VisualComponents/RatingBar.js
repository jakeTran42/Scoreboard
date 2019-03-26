import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './custom.css';

function hsl_col_perc(percent, start=0, end=150) {
    var a = percent / 100,
        b = (end - start) * a,
        c = b + start;
    // Return a CSS HSL string
    return 'hsl('+c+', 100%, 50%)';
}

const rating_ = function(percent) {
    const rating_map = {
        0: 'Terrible', 1: 'Appalling', 2: 'Horrific', 3: 'Awful', 4: 'Bad', 5: 'Playable', 6: 'Decent', 7: 'Good', 8: 'Great', 9: 'Exellent', 10: 'Masterpiece'
    }
    return (rating_map[Math.round(percent/10)])
}

const RatingBar = (props) => {


    const total_rating = Number(props.children) ? Number(props.children).toFixed(0) : 'N/A'

    const color = hsl_col_perc(total_rating)
    
    return (
        <div style={{ width: `${props.containerWidth}` }}>
            <CircularProgressbar
            initialAnimation={true}
            percentage={total_rating}
            text={`${total_rating}%`}
            background
            backgroundPadding={10}
            styles={{
                background: {
                // fill: '#ffffff',
                fill: '#f4f7f6'
                },
                text: {
                    fill: '#f44168',
                    fontSize: '13px',
                    fontWeight: 'bold',
                },
                path: {
                    stroke: color
                }
            }}
            />
            <div style={{display: 'flex', justifyContent: 'center'}}>{rating_(total_rating)}</div>
        </div>
    );
}


 
export default RatingBar;