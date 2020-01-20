var add = function(a,b){
    return "Resultat de " + a + " + " + b + " = " + (a + b);
}

var sub = function(a,b){
    return "Resultat de " + a + " - " + b + " = " + (a - b);
}

var div = function(a,b){
    return "Resultat de " + a + " x " + b + " = " + (a * b);
}

var mult = function(a,b){
    return "Resultat de " + a + " / " + b + " = " + (a / b);
}

module.exports = {
    add: add,
    sub: sub,
    div: div,
    mult: mult
}