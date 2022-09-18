import { ThemeProvider } from 'styled-components';
import './reset.css';

// ============= //
//   THEME JSX   //
// ============= //
export default function Theme({ children }) {

    // ========= //
    //   FONTS   //
    // ========= //
    const headerFamily = "Shining Force Font, Open Sans, sans-serif";
    const bodyFamily = "Shining Force Font, Open Sans, sans-serif";
    const splashFamily = "'Press Start 2P', cursive";

    // ========== //
    //   COLORS   //
    // ========== //
    const palette = {
        black: "#000",
        darkdark: "#1e272e",
        dark: "#2d3436",
        grey: "#596275",
        white: "#fff",
        light: "#dfe6e9",
        blue: "#3498db",
        darkBlue: "#2980b9",
        brown: "#ccae62",
        darkBrown: "#5e463d",
        green: "#2ecc71",
        darkGreen: "#27ae60",
        red: "#e74c3c",
        darkRed: "#c0392b",
        orange: "#f39c12",
        yellow: "#f6e58d",
        darkYellow: "#f6e58d",
        gold: "#ccae62",

        // rad colors
        fogDog: "#f06d06",
    }

    // ================ //
    //   THEME OBJECT   //
    // ================ //
    const theme = {
        palette: palette,

        color: {
            font: palette.light,
            background: palette.dark,

            primary: palette.light,
            primary_off: palette.gold,

            secondary: palette.red,
            secondary_off: palette.dark,

            splash: palette.gold,
            splash_off: palette.red,
        },

        breakpoint: {
            mobile: "767px",
            tablet: "768px",
            desktop: "1040px",
        },

        font: {
            header: headerFamily,
            body: bodyFamily,
            splash: splashFamily,
        },

        max: {
            width: "1200px",
        },
    }

    // ============== //
    // === RETURN === //
    // ============== //
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
};