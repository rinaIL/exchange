import React, {useState, useEffect} from 'react'
import ExchangeService from '../../api/ExchangeService';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container';
import hooks from '../../hooks/hooks'

const Nav2 = () => {
    const base ='EUR'
    const symbols = 'AUD,GBP,ILS,JPY,CAD,KRW,CNY,RUB,CHF,USD'
    const[currencies, setCurrencies] = useState([])
    const[rates,setRates] = hooks.useStateWithSessionStorage('rates')

    const retrieveCurrencies = async() => {
            const rates = await (await ExchangeService.getRates(base, symbols)).data.rates
            const curr = []           
            Object.keys(rates).forEach( (key) => {
                curr.push({
                   name: key,
                   value: rates[key] 
                })               
            })
            setCurrencies(curr)
    }

    const retrieveRates = async() => {
        const rates = await (await ExchangeService.getRates(base, symbols)).data.rates
        const curr = []           
        Object.keys(rates).forEach( (key) => {
            curr.push({
               name: key,
               value: rates[key] 
            })               
        })
        console.log("curr in retrieveRates", JSON.stringify(curr))
        setRates(JSON.stringify(curr))
}

    useEffect(() => {
        async function fetchData() {
            await retrieveRates();
        }
        fetchData();
      }, [])

    return (
        <Navbar expand="lg" variant="light" bg="light">
            <Container>
                <Navbar>
                    <Navbar.Text >
                        jadfjkdjkdfkdjfkdfj
                    </Navbar.Text > 
                    {rates && JSON.parse(rates).map((currencie, index) => ( 
                        <Navbar.Text key={index}>
                            <img
                                src={`${currencie.name}.png`}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                                alt="React Bootstrap logo"
                            />
                            {currencie.value}
                        </Navbar.Text> 
                    ))}           
                </Navbar>
            </Container>
        </Navbar>
    )
}

export default Nav2