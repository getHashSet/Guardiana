import styled from 'styled-components';

export const Page = styled.div`
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    button {
        font-family: ${props => props.theme.font.splash};
        cursor: pointer;
    }
`;

export const Wrap = styled.div`
    padding: 1em;

    @media (max-width: ${props => props.theme.breakpoint.mobile}) {
        padding: 0.5em;
    }

    @media (min-width: ${props => props.theme.breakpoint.desktop}) {
        padding: 1.5em;
    }
`;
