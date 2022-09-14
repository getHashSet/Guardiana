import styled from 'styled-components';

export default function HeroWindow() {

    const maxHitPoints = 28;
    const damageTaken = 5;
    const remainingHitPoints = maxHitPoints - damageTaken;

    const maxMagicPoints = 8;
    const magicPointsUsed = 3;
    const remainingMagicPoints = maxMagicPoints - magicPointsUsed;

    return (
        <StyledStatBlock>

            <h3>Name</h3>

            <h3>Lv</h3>

            <HitPointBlock>
                <h3>HP</h3>
                <HitPointBar remainingPoints={maxHitPoints} pointsUsed={damageTaken}>
                    <div />
                    <div />
                </HitPointBar>
                <h3>
                    {remainingHitPoints} / {maxHitPoints}
                </h3>
            </HitPointBlock>

            <MagicPointBlock>
                <h3>MP</h3>
                <MagicPointBar remainingPoints={8} pointsUsed={0}>
                    <div />
                    <div />
                </MagicPointBar>
                <h3>
                    {remainingMagicPoints} / {maxMagicPoints}
                </h3>
            </MagicPointBlock>

        </StyledStatBlock>
    )
}

const StyledStatBlock = styled('div')`
    position: absolute;
    top: 2em;
    right: 3em;
    background-color: ${props => props.theme.palette.blue};
    min-width: 15em;
`;

const PointBlock = styled('div')`
    display: flex;

    h3 {
        width: 4em;
        min-width: fit-content;
    }
`;

const PointBar = styled('div') <{ remainingPoints: number, pointsUsed: number }>`
    display: flex;
    width: 100%;
    height: 1.5em;

    div {
        display: block;

        &:first-child {
            background-color: ${props => props.theme.palette.yellow};
            width: ${props => `${props.remainingPoints * 3}px`};
        }

        &:last-child {
            background-color: ${props => props.theme.palette.red};
            width: ${props => `${props.pointsUsed * 3}px`};
            z-index: 2;
        }
    }
`;

const HitPointBlock = styled(PointBlock)`

`;

const HitPointBar = styled(PointBar)`

`;

const MagicPointBlock = styled(PointBlock)`

`;

const MagicPointBar = styled(PointBar)`

`;