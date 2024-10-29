let container = document.querySelector(".container"); //Opretter objekt med navnet container 
//som vælges med selector og ikke getelementbyid da det er en class.
//queryselector duer med class og id,s så det sku den eneste forskel.
//der kunne sagtens stå getelementbyclass istedetfor
let btn = document.getElementById("spin");
let number = Math.ceil(Math.random() * 2000); // math.ceil runder op til nærmeste positive tal
//random finder et tal mellem 1 og 2000. (med math.random() er nul ikke med. kun 0.00001 men så vil den jo runde op til 1)
//dette tal bliver brugt til antal grader som hjulet skal dreje
const segments = ["en", "to", "tre", "fire", "fem", "seks", "syv", "otte", "ni", "ti", "elleve"];
//laver et nyt object(segments) med et array med alle segmenterne. Segmenterne er laver i diver. som du selfølgelig kan
//se i html,en. Her bliver rækkefølgen på hjulet også lavet.
const women = document.getElementById("winnerwinnerchickendinner");
//alle variablerne er samlet herop så der er lidt orden i det hele.
btn.onclick = function () {
    document.querySelectorAll("#albumliste p").forEach(p => p.style.color = ""); 
    container.style.transform = "rotate(" + number + "deg)";
    // obejktet btn som er den button med id,et spin (defineret i linje 5)
// den skal når den klikkes på udføre følgende funtion. (funktionen er fra linje14-43.)
// obejtet container skal have den en style der transformere
// = "den skal rotere(" + obejktet number er antallet (se linje6)
// + deg som er degress altså definerer enheden som tallene skal manipulere rotationen i.
//dsv at hvis number er 500 så står der =  "rotere(" i 500 grader);
//Hvis man ikke vælger et rotationsretning så er det urets retning
    setTimeout(() => {
        const winningIndex = Math.floor(Math.random() * segments.length);
        // Samme regnestykke som før men denne gang er max længden af segmenter som er 0-10
        // svaret bliver lavet til winningindex.
        // Det er floor dennegang så arrayet der har plads 0/class en også kan blive valgt.
        console.log("Album:", segments[winningIndex], "bliver vist nu");
//console logger svaret. god ide til at kontrollere at alt det rigtige data bliver vist.
        //⬇WINNERWINNER SVARSTED IFELSE STATEMENT⬇
        if (segments[winningIndex] === "en") {
            window.location.href = "https://www.youtube.com/watch?v=CS9OO0S5w2k";
        }
        else {
            const winningAlbumElement = document.querySelector(`[data-id="album-${winningIndex + 1}"]`);
            if (winningAlbumElement) {
                winningAlbumElement.style.color = "#4b48ff"; // Farver det tilsvarende album
                women.textContent = `Album ${segments[winningIndex]} bliver vist nu`;
                hentdata().then(data => {
                    const winningAlbum = data[winningIndex - 1]; // Adjusted to get the correct album from the array
                    if (winningAlbum) {
                        const trackListTable = `
                            <table>
                                <thead>
                                    <tr>
                                        <th>Track Number</th>
                                        <th>Track Title</th>
                                        <th>Track Time (seconds)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${winningAlbum.trackList.map(track => `
                                        <tr>
                                            <td>${track.trackNumber}</td>
                                            <td>${track.trackTitle}</td>
                                            <td>${track.trackTimeInSeconds}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        `;
                        document.getElementById("showtime").innerHTML = trackListTable;
                    }
                });
            }
        }        
        //hvis winningindex tallet bliver 1 som har classen en så skal den spille overraskelsen
        //hvis ikke tallet er 1 så skal den vise beskeden album+tallet+bliver vist nu i objektet kvinder
        //↑WINNERWINNER SVARSTED IFELSE STATEMENT↑
    }, 5000); // 5000 miliseconds eller 5 sekunder som nogen også ville kalde det.
    //ifElse statementet skal tage 5 sekunder med at svare så der er tid til at animationen kan køre færdig

    number += Math.ceil(Math.random() * 2000); // Hver gang funktionen har kørt skal den køre en ny random angle istedet for at bruge den samme.
}; //funktion slut
//Datafetch⬇
//Datafetch⬇
//Datafetch⬇
//Datafetch⬇
const albums = "../Datafolder/albums.json";
const albumlisteDiv = document.getElementById("albumliste");
// Stilvejen bliver defineret som albums.
function hentdata() {
    // "hentdata" funktionen bruges til at hente/håndtere dataen
    return fetch(albums)
    // med return fetch kan albums dataen som bliver fetched også bruges udenfor funktionen hentdata
        .then(response => {
            // Når filen er hentet skal den reagere som følger:
            if (!response.ok) {
                // Hvis filen er status 200-299 (ok) så skal den:
                throw new Error('Alt er bar helt helt ok ${response.status}');
                // Denne besked kommer op i konsollen. ${response.status} er talelt mellem 200-299
            }
            return response.json();
        })
        .catch(error => {
            // Stopper her så alle fejl ikke gå ud og fucker alt muligt andet op.
            console.error("Den er helt gál", error);
            // Logger fejlkoderne i konsollen så man kan debug senere
        });
}

//------------------------------------logdataslut --------------------------------------------\\
hentdata().then(data => {
    const albumListeDiv = document.getElementById("albumliste");
    let albumListHTML = "<p id='title'> Albums</p><p data-id='1'>1. Overraskelse</p>"; // Tilføjer "Overraskelse" på plads 1 med data-id 1

    data.forEach((album, index) => {
        const generatedID = `album-${index + 2}`; // Genererer et unikt ID til hvert album som hedder 'album-indeix+2'
        albumListHTML += `<p data-id="${generatedID}">${index + 2}. ${album.albumName}</p>`;
    });

    albumListeDiv.innerHTML = albumListHTML; // Sætter genereret HTML i albumliste-div'en

});
