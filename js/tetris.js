
(function () {

    const arena = document.getElementById("arena");
    const placedBlocksContainer = document.getElementById("placedBlocks");
    
    function spawnNewBlock() {

        const blockArray =  [[1, 1, 1], [0, 1, 0]]; 
        const blockContainerHtml = "<div id=\"blockContainer\"></div>"; 
        const block = document.createElement("div");
        block.classList.add("block");
        
        arena.innerHTML = blockContainerHtml;
        blockContainer = document.getElementById("blockContainer");

        const fragment = document.createDocumentFragment();
        blockContainer.style.width = (blockArray[0].length * 17) + "px";
        blockContainer.style.height = (blockArray.length * 17) + "px";
        console.log(blockArray.length);
        for (let i = 0; i < blockArray.length; i++) {
            for (let j = 0; j < blockArray[i].length; j++) {
                const blockElement = block.cloneNode(true);

                if(blockArray[i][j] == 0) {
                    blockElement.classList.add("hide");
                }
                fragment.appendChild(blockElement);
            }
        }
        blockContainer.appendChild(fragment);
        arena.appendChild(blockContainer);
    }

    function putBlockOnStartingPosition(obj) {
        obj.style.left = arena.offsetWidth/2 - obj.offsetWidth/2 + "px";
        obj.style.top = 0 + "px";
    }
    
    function moveBlock(obj) {
        obj.style.top = obj.offsetTop + 17 + "px";
        console.log("wysokosc kontenera " + obj.offsetHeight);
        console.log("pozycja kontenera " + obj.offsetTop);
    }

    function isBorderCollison(movingObj) {
        if(movingObj.offsetLeft < 0 || movingObj.offsetLeft > arena.offsetWidth) {
            return true;
        }
        else {
            return false;
        }
    }

    function isPlaced(movingObj, staticObj) {
        console.log('SPRAWDZENIE KOLIZJI Z PODLOGA');
        console.log(movingObj.offsetTop + movingObj.offsetHeight);
        console.log(staticObj.offsetHeight);
        if(movingObj.offsetTop + movingObj.offsetHeight > staticObj.offsetHeight) {
            return true;
        }
        else {
            return false;
        }
    }

    function transformIntoPlacedBlocks(obj) {
        placedBlocksContainer.appendChild(obj);
    }

    function startGame() {
        const intervalID = setInterval(function () {
            moveBlock(blockContainer);
            console.log("interval sie uruchomil");
            if(isPlaced(blockContainer, arena)){
                transformIntoPlacedBlocks(blockContainer);
                console.log('JEBLO');
                clearInterval(intervalID);
            }
        }, 1000 / 2);
    }


    spawnNewBlock();
    putBlockOnStartingPosition(blockContainer);
    startGame();
}());