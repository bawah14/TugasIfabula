const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
    var isValidate = validate(req)
    if(isValidate)
        res.json({
            responseCode:200,
            responseMessage: "SUCCESS GET DATA"
        });
    else 
        res.json({
            responseCode:401,
            responseMessage: "UNAUTHORIZED"
        });
})

app.post('/', (req, res) => {
    var isValidate = validate(req)
    if(isValidate)
        res.json({
            responseCode:200,
            responseMessage: "SUCCESS POST DATA"
        });
    else 
        res.json({
            responseCode:401,
            responseMessage: "UNAUTHORIZED"
        });
})


app.get('/soal1', (req, res) => {
    var result='';
    var num = 50;
    while(num <= 100){
        result += ""+num+" "+ getValue(num) + "<br>" 
        num +=5
    }
    res.send(result)
})

app.get('/soal2', (req, res) => {
    var result='0 1';
    var i;
    var fib = []; // Initialize array!

    fib[0] = 0;
    fib[1] = 1;
    for (i = 2; i <= 20; i++) {
    // Next fibonacci number = previous + one before previous
    // Translated to JavaScript:
        fib[i] = fib[i - 2] + fib[i - 1];
    // console.log(fib[i]);
        result += ' '+fib[i]
    }
    res.send(result)
})

app.get('/soal3/:num', (req, res) => {
    var result='';
    var num = req.params.num;
    // if (typeof num != 'number') return res.send("PARAM TIDAK VALID, MASUKKAN BILANGAN BULAT")
    for (let index = 0; index < num; index++) {
        for (let i = 0; i < index-1; i++) {
            result +="* "
        }
        result +="<br>"
    }
    res.send(result)
})


app.get('/soal4/:num', (req, res) => {
    var result='';
    var num = req.params.num;
    // if (typeof num != 'number') return res.send("PARAM TIDAK VALID, MASUKKAN BILANGAN BULAT")
    res.send(terbilang(num))
})

function terbilang(angka){

    var bilne=["","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas"];

    if(angka < 12){

        return bilne[angka];

    }else if(angka < 20){

        return terbilang(angka-10)+" belas";

    }else if(angka < 100){

        return terbilang(Math.floor(parseInt(angka)/10))+" puluh "+terbilang(parseInt(angka)%10);

    }else if(angka < 200){

        return "seratus "+terbilang(parseInt(angka)-100);

    }else if(angka < 1000){

        return terbilang(Math.floor(parseInt(angka)/100))+" ratus "+terbilang(parseInt(angka)%100);

    }else if(angka < 2000){

        return "seribu "+terbilang(parseInt(angka)-1000);

    }else if(angka < 1000000){

        return terbilang(Math.floor(parseInt(angka)/1000))+" ribu "+terbilang(parseInt(angka)%1000);

    }else if(angka < 1000000000){

        return terbilang(Math.floor(parseInt(angka)/1000000))+" juta "+terbilang(parseInt(angka)%1000000);

    }else if(angka < 1000000000000){

        return terbilang(Math.floor(parseInt(angka)/1000000000))+" milyar "+terbilang(parseInt(angka)%1000000000);

    }else if(angka < 1000000000000000){

        return terbilang(Math.floor(parseInt(angka)/1000000000000))+" trilyun "+terbilang(parseInt(angka)%1000000000000);

    }

}

function getValue(num){
    res = ""

    if(num <= 60 )
        res = "KURANG"
    else if (num <= 70)
        res = "CUKUP"
    else if (num <= 80)
        res = "BAIK"
    else 
        res = "LUAR BIASA"

    return res;
}


function validate(req){
    return req.headers['User-id'] == "ifabula" && req.headers['Scope'] == "User"
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})