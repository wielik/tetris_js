var factory = {};
(function(){

     let gameCfg;
     (function () {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "cfg/game");
        xhr.responseType = "json";
        xhr.addEventListener("load", function () {
            console.log("vbla");
            console.log(this.response);
            gameCfg = this.response[0];
            console.log(gameCfg);

            factory.getElement = function createElement() {
                let arrayOfElements = gameCfg.elementsTypes;
                let randomizedElementFromArray = Math.floor(Math.random() * arrayOfElements.length);
                return arrayOfElements[randomizedElementFromArray];
            };

            console.log(factory.getElement());
        });
        xhr.send();

    }());



}());