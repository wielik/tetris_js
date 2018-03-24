(function () {

    const arena = document.getElementById("arena");
    
    const blockContainer = document.createElement("div");
    const placedBlocksContainer = document.getElementById("placedBlocksContainer");
    blockContainer.id = "blockContainer";
    arena.appendChild(blockContainer);
    
    function fillPlacedBlocksWithEmptyTiles() {
        const fragment = document.createDocumentFragment();
        const singleBlock = document.createElement("div");
        singleBlock.classList = "block hide";

        for(let i = 0; i < arena.offsetWidth - 17; i += 17){
            for(let j = 0; j < arena.offsetHeight - 17; j += 17) {
                const fragmentBlock = singleBlock.cloneNode(true);
                fragment.appendChild(fragmentBlock);
                //console.log(fragment);
            }
        }

        placedBlocksContainer.appendChild(fragment);
    }

    function fillContainerFromArray(targetContainer, arrayInput) {
        const block = document.createElement("div");
        block.classList.add("block");
        
        const fragment = document.createDocumentFragment();
        targetContainer.style.width = (arrayInput[0].length * 17) + "px";
        targetContainer.style.height = (arrayInput.length * 17) + "px";
        console.log(arrayInput.length);
        for (let i = 0; i < arrayInput.length; i++) {
            for (let j = 0; j < arrayInput[i].length; j++) {
                const blockElement = block.cloneNode(true);

                if(arrayInput[i][j] == 0) {
                    blockElement.classList.add("hide");
                }
                fragment.appendChild(blockElement);
            }
        }
        targetContainer.appendChild(fragment);      
    }

    function spawnNewBlock() {
        const blockArray = factory.getElement();
        const blockContainerHtml = "<div id=\"blockContainer\"></div>"; 

        fillContainerFromArray(blockContainer, blockArray);
        return blockArray;
    }

    function putBlockOnStartingPosition(obj) {
        obj.style.left = "153px";
        obj.style.top = 0 + "px";
    }
    
    function moveBlockDown(obj) {
        obj.style.top = obj.offsetTop + 17 + "px";
    }

    function moveBlockLateral(obj, amount) {
        let newPos = obj.offsetLeft + amount;

        if(newPos >= 0 && (newPos + obj.offsetWidth) <= arena.offsetWidth) {
            obj.style.left = newPos + "px";
        }
    }

    function rotateBlock(oldArray) {
        let oldColumns = oldArray.length;
        let oldRows = oldArray[0].length;
        let newColumns = oldRows;
        let newRows = oldColumns;

        let newArray = [];

        for(let i = 0; i < newColumns; i++) {
            for(let j = 0; j < newRows; j++) {
                newArray[i][j] = oldArray[j][i];
            }
        }

        blockContainer.innerHTML = "";
        fillContainerFromArray(blockContainer, blockArray);
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
        console.log(movingObj.offsetHeight);
        console.log(staticObj.offsetHeight);
        if(movingObj.offsetTop + movingObj.offsetHeight >= staticObj.offsetHeight - 4) {
            return true;
        }
        else {
            return false;
        }
    }

    function checkPlacedBlocks() {
          
    }

    function startGame() {
        putBlockOnStartingPosition(blockContainer);

        document.addEventListener("keydown", function (e) {
            switch(e.keyCode) {
                case 38: {
                    //strzalka w gore
                    blockContainer = rotateBlock(blockArray);
                    console.log("OBROC");
                    break;
                }
                case 40: {
                    //strzalka w dol
                    break;
                }
                case 39: {
                    //strzalka w prawo
                    moveBlockLateral(blockContainer, 17);
                    console.log("PRAWO");
                    break;
                }
                case 37: {
                    //strzalka w lewo
                    moveBlockLateral(blockContainer, -17);
                    console.log("LEWO");
                    break;
                }
                default: break;
            }
        }, false);
        const intervalID = setInterval(function () {
            if(isPlaced(blockContainer, arena)){
                checkPlacedBlocks(blockContainer);
                //arena.removeChild(blockContainer);
                console.log('JEBłO');
                clearInterval(intervalID);
                //spawnNewBlock();
                //putBlockOnStartingPosition(blockContainer);
            }
            else moveBlockDown(blockContainer);
            console.log("interval sie uruchomil");

        }, 1000 / 6);
    }

    fillPlacedBlocksWithEmptyTiles();
    let blockArray = spawnNewBlock();

    startGame();
}());