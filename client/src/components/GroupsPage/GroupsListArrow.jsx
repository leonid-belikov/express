import React from "react";
import ReactRough, {Curve} from "react-rough";
import {defaultTheme, Pane} from "evergreen-ui";

// const strokeColor = '#73e067'
const strokeColor = defaultTheme.palette.purple.light
const roughness = 0.5
const roughnessMain = 1
const bowing = 1
const seed = 5

const GroupsListArrow = () => <Pane
    position='absolute'
    top={-20}
    left={90}>
    <ReactRough
        className='groups-page__arrow'
        width={560}
        height={200}>
        <Curve
            points={[
                [ 10, 22 ],
                [ 80, 100 ],
                [ 350, 100 ],
                [ 560, 150 ]
            ]}
            stroke={strokeColor}
            roughness={roughnessMain}
            bowing={bowing}
            seed={seed}
        />
        <Curve
            points={[
                [ 9, 19 ],
                [ 5, 33 ]
            ]}
            stroke={strokeColor}
            roughness={roughness}
            bowing={bowing}
        />
        <Curve
            points={[
                [ 9, 19 ],
                [ 22, 27 ]
            ]}
            stroke={strokeColor}
            roughness={roughness}
            bowing={bowing}
        />
    </ReactRough>
</Pane>

export default GroupsListArrow;
