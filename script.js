const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
});
const getWordInfo = async (word) => {
  try {
    
  resultDiv.innerHTML="Fetching Data ....."
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const data = await response.json();
  // alert("word:" + word)
  let definitions = data[0].meanings[0].definitions[0];
  resultDiv.innerHTML = `
    <h2> <strong>Word: </strong>${data[0].word}</h2>
    <p><strong>Type: </strong>${data[0].meanings[0].partOfSpeech}</p>
    <p>  <strong>Meaning: </strong> ${definitions.definition === undefined ? "Not Found" :  definitions.definition}</p>
    <p>  <strong>Example: </strong> ${definitions.example === undefined ? "Not Found" :  definitions.example}</p>
  

    `;
    //Fetch Antonyms
    if(definitions.antonyms.length===0){
        resultDiv.innerHTML+=`<li>Antonyms : Not Found <br></li>`;
    }
    else{
        for(let i=0;i<definitions.antonyms.length;i++){
            resultDiv.innerHTML+=`<li>Antonyms : ${definitions.antonyms[i]}</li>`
        }
    }
        //Fetch Synonyms
        if(definitions.synonyms.length===0){
            resultDiv.innerHTML+=`<li>Synonyms: Not Found <br></li>`;
        }
        else{
            for(let i=0;i<definitions.synonyms.length;i++){
                resultDiv.innerHTML+=`<li>Synonyms : ${definitions.synonyms[i]}</li>`
            }
        }
    //Adding Read More Button
    resultDiv.innerHTML+=`<a href="${data[0].sourceUrls}" target="_blank">Read More</a>`;
} catch (error) {
    resultDiv.innerHTML=`<p>Sorry You Enter Not Valid Meaning Words,So I Can't Found It </p>`
}
};
