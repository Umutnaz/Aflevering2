let container = document.querySelector(".container"); //Opretter objekt med navnet container
//som vælges med selector og ikke getelementbyid da det er en class.
//queryselector duer med class og id,s så det sku den eneste forskel.
//der kunne sagtens stå getelementbyclass istedetfor
let btn = document.getElementById("spin");
let number = Math.ceil(Math.random() * 2000); // math.ceil runder op til nærmeste positive tal
//random finder et tal mellem 1 og 2000. (med math.random() er nul ikke med. kun 0.00001 men så vil den jo runde op til 1)
//dette tal bliver brugt til antal grader som hjulet skal dreje
const segments = [
  "en",
  "to",
  "tre",
  "fire",
  "fem",
  "seks",
  "syv",
  "otte",
  "ni",
  "ti",
  "elleve",
];
//laver et nyt object(segments) med et array med alle segmenterne. Segmenterne er laver i diver. som du selfølgelig kan
//se i html,en. Her bliver rækkefølgen på hjulet også lavet.
const women = document.getElementById("winnerwinnerchickendinner");
//alle variablerne er samlet herop så der er lidt orden i det hele.
btn.onclick = function () {
  document
    .querySelectorAll("#albumliste p")
    .forEach((p) => (p.style.color = ""));
  container.style.transform = "rotate(" + number + "deg)";
  // obejktet btn som er den button med id,et spin (defineret i linje 6)
  // den skal når den klikkes på udføre følgende funtion. (funktionen er fra linje26-145.)
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
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }
    //hvis winningindex tallet bliver 1 som har classen en så skal den spille overraskelsen
    //hvis ikke tallet er 1 så skal den gøre else {
    else {
      const winningAlbumElement = document.querySelector(
        `[data-id="album-${winningIndex + 1}"]`
      );
      //laver en ny deklaration som er forbindelsen imellem en classen som bliver valgt som winningindex
      //og albumsne, der er fordelt i id
      if (winningAlbumElement) {
        winningAlbumElement.style.color = "#4b48ff";
        //Når der er et album der vinder så skal den gøre albums titlens farve om til #4b48ff som er det blå
        //backup: women.textContent = `Album ${segments[winningIndex]} bliver vist nu`;
        women.textContent = `Album ${[winningIndex + 1]} bliver vist nu`;
        //objektet women er forbundet med id,et winnerwinnerchickendinner
        //Så når der er et winningalbumelemnt over 1 så skal den vise som text
        //'album winningindex +1 blive vist nu.'
        //det er plus 1 da winningindex starter fra 0 og albummet selfølgelig starter fra 1
        //Derfor for at undgå at 1 bliver til 2 osv så pluser jeg den med 1 så 2 bliver til 2
        hentdata().then((data) => {
          //Nu skal der laves tabellerne i showtime diven.
          //derfor starter vi med at finde dataen og vente til at dataen er hentet med .then
          const winningAlbum = data[winningIndex - 1];
          //her bliver der brugt -1 så det passer med at winningindex starter på nul
          if (winningAlbum) {
            //Hvis der er et winning album gør følgende {
            const totalPlayTime = (album) => {
              //definerer en constant der er totalplaytime
              //album er en parameter
              //Det betyder at selve værdien album ikke kan ændres men værdien på albummet godt kan.
              const totalSeconds = album.trackList.reduce(
                (sum, track) => sum + track.trackTimeInSeconds,
                0
              );
              //Tager sum fra alle tracks og pluser dem sammen. og kalder den udregning for totalseconds.
              //Det fordi, guess what. det er den totale mængde af sekunder
              return `${Math.floor(totalSeconds / 60)} minutter og ${
                totalSeconds % 60
              } sekunder`;
              //Her bliver sekunder i totalplaytime lavet om til en sætning i form af
              //Den første udregning finder antallet af minutter i hele tal
              //den anden tager det resterende beløb og laver det om til sekunder igen
              //Dvs at sekunderne aldrig kan komme over 60
            };
            const trackListTable = `
                            <table>
                           
                                <tbody>
                                    <tr>
                                        <td id="ondkat" colspan="3">
                                            Artisten er ${
                                              winningAlbum.artistName
                                            }. 
                                            Albummet blev produceret i ${
                                              winningAlbum.productionYear
                                            }. 
                                            Genren er ${winningAlbum.genre}. 
                                            Last but not least, varer albummet i ${totalPlayTime(
                                              winningAlbum
                                              //Siger sig selv. Men jeg skal jo nok uddybe det.
                                              //winningalbum er forkortelse for det album der har vundet, så den
                                              //henter den specifikke data fra json filen fra det album der endte med at vinde.
                                            )}
                                        </td>
                                    </tr>
                                    <tr> 
                                        <th>Track Nummer</th>
                                        <th>Track Titel</th>
                                        <th>Track Sekunder</th>
                                    </tr>
                                    ${winningAlbum.trackList
                                      .map(
                                        (track) =>
                                          //map bruges da den kommende data skal hentes inde fra et array. som er tracklist.
                                          `
                                        <tr>
                                            <td class="Missekat">${track.trackNumber}</td>
                                            <td class="Missekat">${track.trackTitle}</td>
                                            <td class="Missekat">${track.trackTimeInSeconds}s</td>
                                        </tr>
                                    `
                                      )
                                      .join("")}
                                </tbody>
                            </table>
                        `;
            //laver følgende "setup" til const,en tracklisttable
            document.getElementById("showtime").innerHTML = trackListTable;
            //innerhtml / putter ind i html,en hvor hen? jamen showtime
          }
        });
      }
    }
    //↑WINNERWINNER SVARSTED IFELSE STATEMENT↑
  }, 5000); // 5000 miliseconds eller 5 sekunder som nogen også ville kalde det.
  //ifElse statementet skal tage 5 sekunder med at svare så der er tid til at animationen kan køre færdig

  number += Math.ceil(Math.random() * 2000); // Hver gang funktionen har kørt skal den køre en ny
  //random angle istedet for at bruge den samme.
}; //funktion slut (spin btn)
const albums = "../Datafolder/albums.json";
// Stilvejen bliver defineret som albums.
const albumlisteDiv = document.getElementById("albumliste");
// Kalder det element i html, doc med id,et albumliste for albumlistediv.
//-----------------------------------logdatastart---------------------------------------------\\
function hentdata() {
  // "hentdata" funktionen bruges til at hente/håndtere dataen
  return (
    fetch(albums)
      // med return fetch kan albums dataen som bliver fetched også bruges udenfor funktionen hentdata
      .then((response) => {
        // Når filen er hentet skal den reagere som følger:
        if (!response.ok) {
          // Hvis filen er status 200-299 (ok) så skal den:
          throw new Error("Stor fejl ${response.status}.");
          // Abryder koden og sender fejlen op til næste catch
        }
        console.log(
          `If you dig a 6 feet hole, how did is that hole? its properly like ${response.status} feet.`
        );
        return response.json();
      })
      .catch((error) => {
        // Stopper her så alle fejl ikke gå ud og fucker alt muligt andet op.
        console.error("She said she was ${response.status}", error);
        // Logger fejlkoderne i konsollen så man kan debug senere
      })
  );
}

//------------------------------------logdataslut --------------------------------------------\\
hentdata().then((data) => {
  //kalder på dataen, og venter på at dataen er hentet med .then
  const albumListeDiv = document.getElementById("albumliste");
  // samme som på linje 148. men skal skrives igen da det nu er i en ny context
  let albumListHTML =
    "<p id='title'> Albums</p><p data-id='1'>1. Overraskelse</p>";
  // Tilføjer "Overraskelse" på plads 1 med data-id 1.
  //Det er fordi at overraskelsen ikke har noget med albumsne at gøre.
  data.forEach((album, index) => {
    //foreach / for hvert album / index
    const generatedID = `album-${index + 2}`;
    // Genererer et unikt ID til hvert album som hedder 'album-indeix+2'
    // et eksempel er id="album-2"
    albumListHTML += `<p data-id="${generatedID}">${index + 2}. ${
      album.albumName
    }</p>`;
  });
  //opretter i liste en paragraf med det generet is som ene liste
  // Albumnavn derudfra

  albumListeDiv.innerHTML = albumListHTML; // Sætter genereret HTML i albumlistediven
});
//:D
