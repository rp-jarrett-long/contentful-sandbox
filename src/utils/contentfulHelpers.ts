/** Heler function to determine if a contentful link is resolved.
 * In other words, if it is NOT UnresolvedLink
 * @param link - The contentful link to check.
 * @returns True if the link is resolved, false otherwise.
 */
export const isResolvedLink = (link: object) => 'fields' in link;
