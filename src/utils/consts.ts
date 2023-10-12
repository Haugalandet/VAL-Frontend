/**
 * 
 * @param url api endpoint
 * @returns root:8080/url
 */
export function ApiRoot(url: string): string {
    return `localhost:8080/${url}`
}