/* eslint-disable @typescript-eslint/no-unused-vars */
export const getFilledFields = (obj: Record<string, any>) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => value !== '')
    );
};