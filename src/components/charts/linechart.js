import { getDefaultNormalizer } from '@testing-library/react'
import React, {useState, useEffect} from 'react'
import { Line } from 'react-chartjs-2'
import MetalsService from '../../api/MetalsService'
import hooks from '../../hooks/hooks'

const getFirstDaysOfMonth = year => {
    const dates = new Array()
    for (let index = 1; index <= 5; index++) {
        dates.push(`${year}-${index}-01`)           
    }
    return dates
}

function LineChart() {
    const [metals, setMetals] = hooks.useStateWithSessionStorage('metals')
    const [lineData, setLineData] = useState([])
    //const monthsNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const monthsNames = ["Jan","Feb","Mar","Apr","May"];
    

    const retrieveMetalsRates = async() => {
        const symbols = ['XAU','XAG']
        const dates = getFirstDaysOfMonth('2020')
        const ratesMonth = {}
        try{
            await Promise.all (dates.map(async (d) => {
                let date = new Date(d)
                const month = date.toLocaleString('en-us', { month: 'short' })
                const rates = await (await MetalsService.getHistorical(d,'USA',symbols)).data.rates 
                console.log(`Rates in promise all in ${d}`, rates)
                const devideXAGandXAU = parseFloat(rates.XAG) / parseFloat(rates.XAU)
                console.log("devide XAG on XAU", devideXAGandXAU)
                ratesMonth[month] = JSON.stringify(devideXAGandXAU)
            })) 
        }  catch(e) {
            console.log("If any of the promises rejected, so will Promise.all")
        }
        console.log("retrievMetalsRate", ratesMonth)
        setMetals(JSON.stringify(ratesMonth))         
    }


    useEffect(() => {
        async function fetchData(){
            if (metals !== '') {
                return
            }
            await retrieveMetalsRates()        
        }
        fetchData()
        setLineData(getData());
    },[])

    const getData = () => {
        const data = [];
        console.log('metals in getData', metals)
        if (metals !== '') {
            monthsNames.map((month) => {
                console.log(`${month} month`, JSON.parse(metals)[month])
                data.push(JSON.parse(metals)[month])
            })
        }
        console.log("getData",data)
        return data;
    }

    const data = {
        labels:monthsNames,
        datasets: [{
            label: 'Rina for 2021',
            data: lineData,
            borderWidth: 3,
            fill: false,
            borderColor: "green"
        }]
    }

    let line
    if(lineData.length === 0) {
        line = <p>Loading...</p>
    } else {
        line =  <Line data={data}/>
    }
    return (line)
}

export default LineChart