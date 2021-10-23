import http from './http-exchagerates';

const getAll = async() => {
    return await http.get();
}

const getRates = async(base,symbols) => {
    return await http.get('', {
        params: {
            base: base,
            symbols: symbols
        }
    })
}


export default {
    getAll,
    getRates
}

