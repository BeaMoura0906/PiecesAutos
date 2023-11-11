export function ajoutListenerAvis(){
    const btnAvisElement = document.querySelectorAll('#fiches article button')
    
    for( let btnAvis of btnAvisElement ){
        btnAvis.addEventListener('click', (e)=>{
            const currentBtn = e.target
            const idFiche = currentBtn.dataset.id
            const isSetAvis = currentBtn.nextElementSibling
            if(isSetAvis !== null){
                isSetAvis.remove()
                return
            }
            fetch('http://localhost:3000/pieces/' + idFiche + '/avis')
                .then(response=>{
                    return response.json() 
                })
                .then(listAvis=>{
                    const pieceElem = currentBtn.parentElement
                    const avisElem = document.createElement('p')
                    for(let avis of listAvis){
                        avisElem.innerHTML += '<br/> <b>' + avis.utilisateur + '</b> : ' + avis.commentaire + '<br/>'
                    }
                    pieceElem.appendChild(avisElem)
                    
                })
                .catch( error=>{
                    console.log('Erreur ! ', error)
                })
        })

    }
}

export function ajoutAvis() {
    const formAvis = document.querySelector('#form-avis')
    formAvis.addEventListener('submit', (e)=>{
        e.preventDefault()
        const avis = {
            pieceId: formAvis.querySelector('#piece-id').value,
            utilisateur: formAvis.querySelector('#utilisateur').value,
            commentaire: formAvis.querySelector('#commentaire').value,
            nbEtoiles: formAvis.querySelector('#nbEtoiles').value
        }
        fetch('http://localhost:3000/avis', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify( avis )
        })
        .then(response=>{
            if( response.status === 201 ){
                const mess = document.querySelector('#message')
                mess.innerHTML = '<span class="alert alert-success alert-sm">Votre commentaire a bien été ajouté</span>'
                formAvis.reset()
            }
        })
        .catch( error=>{
            console.log( "Erreur lors de l'ajout ! ", error)
        })
    })
}