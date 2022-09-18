import styled from 'styled-components';
import frame from '../../assets/misc/frame.png';

export const Window = styled('section')`
    border: 24px solid black;
    border-radius: 1em;
    border-image-source: url(${frame});
    border-image-slice: 12 12;
    border-image-repeat: round;
    border-image-outset: 0;
    background-color: darkblue;
`;