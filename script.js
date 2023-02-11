const tile=document.querySelector('.tile-container');
const key=document.querySelector('.keyboard-container');
const mes=document.querySelector('.message-container');
const keys=[
    'Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','ENTER','Z','X','C','V','B','N','M','DEL',
]
let word;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '29e44d88b7mshfa4774b1d70a678p166cfdjsne8236fba73ce',
		'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
	}
};
const options2 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '29e44d88b7mshfa4774b1d70a678p166cfdjsne8236fba73ce',
		'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
	}
};


const getWord = () => {
    fetch('https://random-words5.p.rapidapi.com/getMultipleRandom?count=5&wordLength=5', options).then(response => response.json()).then(json => {
        word=json[0].toUpperCase();
        //console.log(word);
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
const clearBoard = () => {
    for(let currentRow=0;currentRow<6;currentRow++){
        for(let i=0;i<guessRows[currentRow].length-1;i++){
            const curr=document.getElementById('guessRow-'+currentRow+'-tile-'+i);
            curr.textContent='';
            guessRows[currentRow][currentCol]='';
            curr.setAttribute('data','');
            if(curr.classList.contains('green-col')){
                curr.classList.remove('green-col');
            }
            if(curr.classList.contains('yellow-col')){
                curr.classList.remove('yellow-col');
            }
            if(curr.classList.contains('grey-col')){
                curr.classList.remove('grey-col');
            }
            if(curr.classList.contains('flip')){
                curr.classList.remove('flip');
            }
        }
    }
    const letter = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    letter.forEach(letter => {
        const x=document.querySelector('#'+letter);
        if(x.classList.contains('grey-col')){
            x.classList.remove('grey-col');
        }
        if(x.classList.contains('green-col')){
            x.classList.remove('green-col');
        }
        if(x.classList.contains('yellow-col')){
            x.classList.remove('yellow-col');
        }
        if(x.classList.contains('fli[')){
            x.classList.remove('flip');
        }
    });
    getWord();
    currentRow=0;
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
        fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${guess}`, options2).then(response => response.json()).then(json =>{
            if(json.list.length!==0){
                let str=guess;
                addColor();
                if(str===word){
                    showMessage('Magnificient!');
                    isGameOver=true;
                    setTimeout(clearBoard(),2000);
                    return;
                }
                else{
                    if(currentRow>=5){
                        isGameOver=false;
                        showMessage('Game Over! Word is '+word);
                        setTimeout(clearBoard(),2000);
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