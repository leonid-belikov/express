import {defaultTheme} from "evergreen-ui";

export function getRandomBackgroundColor() {
    const colors = [
        'neutral',
        'blue',
        'red',
        'orange',
        'green',
        'teal',
        'purple',
    ]
    const randomIndex = Math.floor(Math.random() * colors.length)
    const colorName = colors[randomIndex]
    return defaultTheme.palette[colorName].light;
}