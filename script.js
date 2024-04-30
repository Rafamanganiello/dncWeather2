async function getAdressByCep(){
    const cep = document.getElementById('cep').value;
    console.log(cep)
    try{
        const response = await fetch(`http://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json()
        console.log(data); 
        document.getElementById('rua').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('estado').value = data.uf;
    } catch (error){
        alert(error.message);
    }
    
}
async function getPrevisao(){
    const lat = document.getElementById('lat').value;
    const long = document.getElementById('long').value;
    console.log(lat)
    console.log(long)
    try{
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&daily=temperature_2m_max&forecast_days=1`);
        const data = await response.json();
        console.log(data); 
        document.getElementById('answer').innerHTML = "";
        
    
        for (let i = 0; i <= 0; i++) {
            document.getElementById('answer').innerHTML += `<div>Previsão de tempo de acordo com a região: ${data.hourly.temperature_2m[i]}°C</div>`;
    }
        
    }
    catch (error){
        alert(error.message);
    }
}

const btn = document.querySelector("#botao");
 
btn.addEventListener("click", () =>{
    
    getAdressByCep();
    getPrevisao();
 })

 // lat: -24.73, long: -53.75,

 const express = require('express');
 const httpProxy = require('http-proxy');
 
 const app = express();
 const proxy = httpProxy.createProxyServer();
 
 
 app.use('/api', (req, res) => {
   proxy.web(req, res, { target: 'https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&daily=temperature_2m_max&forecast_days=1' });
 });
 
 
 const port = process.env.PORT || 3000;
 app.listen(port, () => {
   console.log(`Proxy server is running on port ${port}`);
 });
 