import {defaultTheme, toaster} from "evergreen-ui";


export function checkAuthFailed(e) {
    if (e.response.status === 401) {
        toaster.danger('Ошибка авторизации')
        console.log('Ошибка авторизации: ', e)
        return true
    }
    return false
}

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