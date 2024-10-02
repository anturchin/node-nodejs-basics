import { access, constants } from 'node:fs/promises';

const toBool = [() => true, () => false];

export const fileExists = (path) => {
    return access(path, constants.R_OK | constants.W_OK).then(...toBool);
}
