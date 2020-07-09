import Axios, { AxiosInstance } from 'axios';

export const getUrl = (endpoint: string, ...extraParams: string[]): string => {
    const extra = !!extraParams.length ? extraParams.join('&') : '';
    return extra ? `${ endpoint }?${ extra }` : `${ endpoint }`;
}


export const client: AxiosInstance = Axios.create({
    baseURL: 'http://localhost:4200',
    timeout: 10000
});

