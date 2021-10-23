import http from './http-metals';

const accessKey ="n893q3fsn029nqfcie992bjv9ejaojhyyh1n2vf13z9cdvaine686l6sbpxx"

const getLatest = async() => {
    return await http.get(`latest?access_key=${accessKey}`);
}

const getHistorical = async(date,base,symbols) => {
    return await http.get(`${date}?access_key=${accessKey}`,{
        params:{
            base:base,
            symbols:symbols.toString()
        }
    })
}


export default {
    getLatest,
    getHistorical
}

