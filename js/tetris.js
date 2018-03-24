


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

        for(let i = 0; i < arena.offsetWidth; i += 17){
            for(let j = 0; j < arena.offsetHeight; j += 17) {
                const fragmentBlock = singleBlock.cloneNode(true);
                fragment.appendChild(fragmentBlock);
                //console.log(fragment);
            }
        }

        placedBlocksContainer.appendChild(fragment);
    }

    function spawnNewBlock() {
        const blockArray = factory.getElement();
        const blockContainerHtml = "<div id=\"blockContainer\"></div>"; 
        const block = document.createElement("div");
        block.classList.add("block");
        
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

        for(let i = 0, ln = obj.children.length; i < ln; i++) {
            //for(let j = 0; j < obj.length[i])
            //placedBlocksContainer.appendChild(obj.children[0]);
            console.log("BLA");
        }

    }

    function startGame() {
        putBlockOnStartingPosition(blockContainer);
        const intervalID = setInterval(function () {
            if(isPlaced(blockContainer, arena)){
                transformIntoPlacedBlocks(blockContainer);
                console.log('JEBłO');
                clearInterval(intervalID);
                //spawnNewBlock();
                //putBlockOnStartingPosition(blockContainer);
            }
            moveBlock(blockContainer);
            console.log("interval sie uruchomil");

        }, 1000 / 6);
    }

    fillPlacedBlocksWithEmptyTiles();
    spawnNewBlock();

    startGame();
}());