export function objectId(value: string, helpers: any) {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value;
}
export function capitalize(value: string, helpers: any) {
    return value.replace(/\b\w/g, (l) => l.toUpperCase());
}

