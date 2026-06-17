import { parseURL, stringifyParsedURL } from 'ufo'

export const constructSubscriptionUrl = (currentUrl: string, shortUuid: string): string => {
    const url = parseURL(currentUrl)

    url.search = ''
    url.hash = ''
    url.auth = ''

    // The page itself is served at /link/<token>, not at the raw subscription
    // route — the raw endpoint is always /<shortUuid> off the origin, regardless
    // of which path the page was loaded from.
    url.pathname = `/${shortUuid}`

    return stringifyParsedURL(url)
}
