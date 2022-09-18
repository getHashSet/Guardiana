import styled from 'styled-components';
import * as S from '../../styles';

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

            <h3>LV <span>7</span></h3>

            <HitPointBlock>
                <div>
                    <h3>HP</h3>
                    <HitPointBar remainingPoints={maxHitPoints} pointsUsed={damageTaken}>
                        <div />
                        <div />
                    </HitPointBar>
                </div>
                <h3>
                    {remainingHitPoints} / {maxHitPoints}
                </h3>
            </HitPointBlock>

            <MagicPointBlock>
                <div>
                    <h3>MP</h3>
                    <MagicPointBar remainingPoints={8} pointsUsed={0}>
                        <div />
                        <div />
                    </MagicPointBar>
                </div>
                <h3>
                    {remainingMagicPoints} / {maxMagicPoints}
                </h3>
            </MagicPointBlock>

        </StyledStatBlock>
    )
}

const StyledStatBlock = styled(S.Window)`
    position: absolute;
    top: 2em;
    right: .5em;
    min-width: 10em;
    font-size: 2em;
`;

const PointBlock = styled('div')`
    display: flex;
    justify-content: space-between;

    div {
        display: flex;
    }

    h3 {
        min-width: fit-content;
    }
`;

const PointBar = styled('div') <{ remainingPoints: number, pointsUsed: number }>`
    display: flex;
    height: 1.5em;
    overflow: hidden;
    border-radius: 8px;
    margin: 0 .5em;

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