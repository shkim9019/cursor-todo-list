import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#697F8C",
                secondary: "#D8F0F2",
                tertiary: "#C1D6D9",
                accent: "#A69286",
                dark: "#0D0D0D",
            },
            fontSize: {
                "responsive-sm": "clamp(0.8rem, 1.5vw, 1rem)",
                "responsive-base": "clamp(1rem, 2vw, 1.25rem)",
                "responsive-lg": "clamp(1.25rem, 2.5vw, 1.5rem)",
                "responsive-xl": "clamp(1.5rem, 3vw, 2rem)",
                "responsive-2xl": "clamp(2rem, 4vw, 2.5rem)",
            },
        },
    },
    plugins: [],
};
export default config;
