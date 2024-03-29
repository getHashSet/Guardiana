import styled from 'styled-components';

export const Reset = styled.main`
    
    @font-face {
        font-family: 'Shining Force Font';
        src: url('../font/shining-force-font.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    color: ${props => props.theme.color.font};
    overflow-x: hidden;

    * {
        font-family: 'Shining Force Font';
        line-height: 1.5em;

        &::selection {
            color: ${props => props.theme.palette.white};
            background-color: ${props => props.theme.color.splash};
        }
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: 900;
        font-family: ${props => props.theme.font.header};
    }
    a {
        color: ${props => props.theme.color.splash_off};
    }
    input {
        display: block;
        background-color: white;
        border: none;
        padding: 2px 4px;
        margin-bottom: 2px;
        &:focus {
            outline: 2px dashed ${props => props.theme.color.splash_off};
        }
    }
    ul {
        list-style: none;
        li {
            padding-right: .5em;
        }
    }
    svg {
        width: 1em;
        max-width: 100%;
        max-height: 100%;
        user-select: none;
    }
`;