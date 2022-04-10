import React from 'react';
import { withStyles, Slider, Tooltip } from '@material-ui/core';
import ValueLabel from '@material-ui/core/Slider/ValueLabel';
import defaultStyle from '../../../style';

const PrettoSlider = withStyles({
    root: {
        color: defaultStyle.color1,
        // height: 8,
        boxSizing: 'border-box',
    },
    thumb: {
        height: 16,
        width: 16,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        // marginTop: -6,
        // marginLeft: -6,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {},
    track: {
        height: 4,
        borderRadius: 4,
    },
    rail: {
        height: 4,
        borderRadius: 4,
    },
})(Slider);

const StyledValueLabel = withStyles({
    offset: {
        top: -10,
        left: -5,
    },
    circle: {
        width: 24,
        height: 24,
        // transform: (props) =>
        //     props.index === 0 ? 'rotate(-90deg)' : 'rotate(0deg)',
    },
    label: {
        // transform: (props) =>
        //     props.index === 0 ? 'rotate(90deg)' : 'rotate(0deg)',
        fontSize: '0.8rem',
    },

    // width: 20,
    // height: 20
})(ValueLabel);

function CustomSlider({ handleChange }) {
    return (
        <PrettoSlider
            defaultValue={0}
            // getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-small-steps"
            step={0.1}
            marks={true}
            min={0}
            max={1}
            track="inverted"
            valueLabelDisplay="on"
            onChangeCommitted={handleChange}
            ValueLabelComponent={StyledValueLabel}
        />
    );
}

export default CustomSlider;
