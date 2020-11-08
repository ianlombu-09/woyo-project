import React from 'react'
import PropTypes from 'prop-types'
import { Star, StarHalf, StarBorder }  from '@material-ui/icons';

const Rating = ({ value, text, color }) => {
    return (
        <div className='rating'>
            <span>
                { 
                    value >=1   
                    ? <Star style={{ color }} />
                    : value >= 0.5
                    ? <StarHalf style={{ color }} />
                    : <StarBorder style={{ color }} />
                }
            </span>

            <span>
                { 
                    value >=2   
                    ? <Star style={{ color }} />
                    : value >= 1.5
                    ? <StarHalf style={{ color }} />
                    : <StarBorder style={{ color }} />
                }
            </span>

            <span>
                { 
                    value >=3   
                    ? <Star style={{ color }} />
                    : value >= 2.5
                    ? <StarHalf style={{ color }} />
                    : <StarBorder style={{ color }} />
                }
            </span>

            <span>
                { 
                    value >=4   
                    ? <Star style={{ color }} />
                    : value >= 3.5
                    ? <StarHalf style={{ color }} />
                    : <StarBorder style={{ color }} />
                }
            </span>

            <span>
                { 
                    value >=5   
                    ? <Star style={{ color }} />
                    : value >= 4.5
                    ? <StarHalf style={{ color }} />
                    : <StarBorder style={{ color }} />
                }
            </span>


            
            <span>{text && text}</span>
        </div>
    )
}

Rating.defaultProps = {
    color: '#E94A4A',
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string,
    color: PropTypes.string
}

export default Rating
