import { ajoutListenerAvis } from "./avis.js"

import { ajoutAvis } from "./avis.js"

const response = await fetch('http://localhost:3000/pieces')
const pieces = await response.json()

console.log(pieces)

const sectionFiches = document.querySelector('#fiches')
const btnTrier = document.querySelector('#btn-trier')

const btnAbordable = document.querySelector('#btn-filtre')

const btnReset = document.querySelector('#btn-reset')

btnTrier.addEventListener('click', (e)=>{
    const piecesOrdonnees = Array.from(pieces)
    piecesOrdonnees.sort(function(a,b){
        return a.prix - b.prix
    })
    sectionFiches.innerHTML = ''
    showPieces(piecesOrdonnees)
})

btnAbordable.addEventListener('click', (e)=>{
    const piecesFiltre = pieces.filter(function( piece ){
        return piece.prix <= 35
    })

    //const nomPieces = pieces.map( pieces => pieces.nom)

    /* const nomPieces = pieces.map( function(pieces){
        return pieces.nom
    }) */

    const nomPieces = pieces.map( pieces => {
        return {
            nom: pieces.nom,
            prix: pieces.prix
        }
    })
    
    sectionFiches.innerHTML = ''
    showPieces(piecesFiltre)
})

btnReset.addEventListener('click', (e)=>{
    sectionFiches.innerHTML = ''
    showPieces(pieces)
})

function showPieces (pieces) {

    for( let article of pieces ) {
        const imageElement = document.createElement('img')
        imageElement.src = article.image
        const nomElement = document.createElement('h4')
        nomElement.textContent = article.nom 
        const prixElement = document.createElement('p')
        prixElement.textContent = 'Prix : ' + article.prix + ' €'
        const categorieElement = document.createElement('p')
        categorieElement.textContent = article.categorie ?? '(aucune catégorie)'
        const descriptionElement = document.createElement('p')
        descriptionElement.textContent = article.description ?? 'Pas de description'
        const pieceDispo = article.disponibilite === true ? "Oui" : "Non"
        const pieceDispoElement = document.createElement('p')
        pieceDispoElement.innerHTML = `Pièce disponible : <b> ${pieceDispo} </b>`
        //pieceDispoElement.innerHTML = 'Pièce disponible : <b>' + pieceDispo + '<\b>'

        const btnAvis = document.createElement('button')
        btnAvis.dataset.id = article.id
        btnAvis.dataset.nom = article.nom
        btnAvis.innerText = "Afficher les avis"

        const ficheElement = document.createElement('article')
        ficheElement.setAttribute('class', 'col-3')
        ficheElement.appendChild(imageElement)
        ficheElement.appendChild(nomElement)
        ficheElement.appendChild(prixElement)
        ficheElement.appendChild(categorieElement)
        ficheElement.appendChild(descriptionElement)
        ficheElement.appendChild(pieceDispoElement)
        ficheElement.appendChild(btnAvis)

        sectionFiches.appendChild(ficheElement)
    }
}

showPieces(pieces)

ajoutListenerAvis()

ajoutAvis()