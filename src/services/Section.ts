import fetch from 'isomorphic-unfetch';
import { API_BASE } from '../constants';

// tslint:disable-next-line: no-any
function SectionApi (this: any) {
    async function request (url: string) {
        return fetch(API_BASE + '/' + url);
    }

    this.getAll = async (blockId: number) => {
        const res = request('sections/block?blockId=' + blockId);
        const json = (await res).json();
        return json;
    };

    return this;
}

export default SectionApi;