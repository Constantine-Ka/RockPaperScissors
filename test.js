let rpsTolal= {
    "channel":{}
}
function main() {
    var vrbl = String(794977447426654240) // Переменная равная строке приобразованной из числа
    rpsTolal.channel[vrbl]=[0,0]  
    id = "703162383299903558"

	rpsTolal.channel[id]=[0,0]
    console.log(rpsTolal);
}
main()

/*
Хочу видеть запись:
 "rpsTolal":{
    "channel":{
        "794977447426654240":[0,0]
    }
А вижу ошибку:
    (node:5548) UnhandledPromiseRejectionWarning: TypeError: Cannot set property '794977447426654240' of undefined
*/