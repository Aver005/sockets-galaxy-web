export const getPosition = () =>
{
    const x = window.screenX + window.innerWidth / 2;
    const y = window.screenY + window.innerHeight / 2;
    return [x, y];
}