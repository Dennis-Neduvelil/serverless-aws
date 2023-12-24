// tslint:disable-next-line:export-name
export function env(name: string, defaultValue?: any): any {
    let value = process.env[name];
    if (process.env[name] === undefined) {
        if (defaultValue === undefined) {
            throw new Error(
                `The environment variable '${name}' is not defined`,
            );
        }
        value = defaultValue;
    }
    switch (value) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return value;
    }
}
