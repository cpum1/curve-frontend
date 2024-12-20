
const [MOBILE_BREAKPOINT, TABLET_BREAKPOINT, DESKTOP_BREAKPOINT, MAX_WIDTH] = [320, 640, 1200, 2000]
const [MIN_HEIGHT, MAX_HEIGHT] = [600, 1000]

const randomInt = (min: number, maxExclusive: number): number => Math.floor(Math.random() * (maxExclusive - min)) + min

export const oneDesktopViewport = () => [randomInt(DESKTOP_BREAKPOINT, MAX_WIDTH), randomInt(MIN_HEIGHT, MAX_HEIGHT)] as const
export const oneMobileOrTabletViewport = () => [randomInt(MOBILE_BREAKPOINT, DESKTOP_BREAKPOINT), randomInt(MIN_HEIGHT, MAX_HEIGHT)] as const
