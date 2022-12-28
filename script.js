const tile=document.querySelector('.tile-container');
const key=document.querySelector('.keyboard-container');
const mes=document.querySelector('.message-container');
const keys=[
    'Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','DEL',
]
let word;

const getWord = () => {
    fetch('https://random-word-api.herokuapp.com/word?length=5').then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
        word=json[0].toUpperCase();
    }).catch(err=> console.log(err));
}
getWord();
let isGameOver=false;
const guessRows=[
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
    ['','','','',''],
]
let currentRow=0;
let currentCol=0;
guessRows.forEach((guessRow,guessRowIndex)=>{
    const rowElement=document.createElement('div');
    rowElement.setAttribute('id','guessRow-'+guessRowIndex);
    guessRow.forEach((guess,guessIndex)=>{
        const tileElement=document.createElement('div');
        tileElement.setAttribute('id','guessRow-'+guessRowIndex+'-tile-'+guessIndex);
        tileElement.classList.add('tile');
        rowElement.append(tileElement);
    })
    tile.append(rowElement);

})
const handleClick=(k)=>{
    if(k==='ENTER'){
        checkWord();
    }
    else if(k==='DEL'){
        if(currentCol>0){
            currentCol--;
            const curr=document.getElementById('guessRow-'+currentRow+'-tile-'+currentCol);
            curr.textContent='';
            guessRows[currentRow][currentCol]='';
            curr.setAttribute('data','');
        }
    }
    else addLetter(k);
}
const clearRow = () => {
    for(let i=0;i<guessRows[currentRow].length-1;i++){
        const curr=document.getElementById('guessRow-'+currentRow+'-tile-'+i);
        curr.textContent='';
        guessRows[currentRow][currentCol]='';
        curr.setAttribute('data','');
    }
    currentCol=0;
}
const addLetter=(letter)=>{
    if(currentRow<6 && currentCol<5){
        const curr=document.getElementById('guessRow-'+currentRow+'-tile-'+currentCol);
        curr.textContent=letter;
        guessRows[currentRow][currentCol]=letter;
        curr.setAttribute('data',letter);
        currentCol++;
    }
}
const checkWord=()=>{
    if(currentCol==5){
        const guess=guessRows[currentRow].join('');
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`).then(response => response.json() ).then(json =>{
            if(json[0]!==undefined){
                let str=guess;
                addColor();
                if(str===word){
                    showMessage('Magnificient!');
                    isGameOver=true;
                    return;
                }
                else{
                    if(currentRow>=5){
                        isGameOver=false;
                        showMessage('Game Over! Word is '+word);
                    }
                    else{
                        currentRow++;
                        currentCol=0;
                    }
                }
            }
            else{
                showMessage(`Oops! ${guess} is not a word.`)
                clearRow();
            }
        })
    }
}
const showMessage=(message)=>{
    const messageElement=document.createElement('p');
    messageElement.textContent=message;
    mes.append(messageElement);
    setTimeout(()=>mes.removeChild(messageElement),2000);
}

keys.forEach(k=>{
    const buttonElement=document.createElement('button');
    buttonElement.textContent=k;
    buttonElement.setAttribute('id',k);
    buttonElement.addEventListener('click',()=>handleClick(k));
    key.append(buttonElement);
})

const addColor=()=>{
    const ti=document.querySelector('#guessRow-'+currentRow).childNodes;
    let checkWord=word;
    ti.forEach((t,ind)=>{
        const letter=t.getAttribute('data');
        const x=document.querySelector('#'+letter);
        if(letter==checkWord[ind]){
            t.classList.add('flip');
            x.classList.add('flip');
            t.classList.add('green-col');
            x.classList.add('green-col');
            checkWord=checkWord.replace(letter,'.');            
        }
        
    })
    ti.forEach((t,ind)=>{
        const letter=t.getAttribute('data');
        const x=document.querySelector('#'+letter);
        t.classList.add('flip');
        x.classList.add('flip');
        if(checkWord.includes(letter)){
            t.classList.add('yellow-col');
            x.classList.add('yellow-col');
            checkWord=checkWord.replace(letter,'.');
        }
        else{
            t.classList.add('grey-col');
            x.classList.add('grey-col');
        }
    });  
}