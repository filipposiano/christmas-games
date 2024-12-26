document.addEventListener("DOMContentLoaded", () => {
  const numCartelleInput = document.getElementById("numCartelle");
  const costoCartellaInput = document.getElementById("costoCartella");
  const calcolaButton = document.getElementById("calcola");
  const totaleDaDividereElement = document.getElementById("totaleDaDividere");
  const bicchieri = document.querySelectorAll(".bicchiere");

  // Funzione per arrotondare ai 10 centesimi più vicini
  const arrotonda10Centesimi = (valore) => Math.round(valore * 10) / 10;

  // Funzione per calcolare e aggiungere premi
  const calcolaPremi = () => {
    const numCartelle = parseInt(numCartelleInput.value, 10) || 0;
    const costoCartella = parseFloat(costoCartellaInput.value) || 0;
    const totale = numCartelle * costoCartella;

    console.log(`Totale: ${totale}`);

    // Aggiorna il totale dei soldi che vanno divisi
    totaleDaDividereElement.textContent = totale.toFixed(2);

    // Verifica che la somma delle percentuali faccia 100%
    let sommaPercentuali = 0;
    bicchieri.forEach((bicchiere) => {
      const percentualeInput = bicchiere.querySelector(".percentuale");
      const percentuale = parseFloat(percentualeInput.value) || 0;
      sommaPercentuali += percentuale;
    });

    if (sommaPercentuali !== 100) {
      alert("La somma delle percentuali deve essere 100%");
      return;
    }

    // Accumulatore per gestire arrotondamenti
    let totaleDistribuito = 0;

    // Calcola i premi e aggiungi ai valori già presenti
    bicchieri.forEach((bicchiere, index) => {
      const tipo = bicchiere.getAttribute("data-bicchiere");
      const percentualeInput = bicchiere.querySelector(".percentuale");
      const percentuale = parseFloat(percentualeInput.value) / 100;
      const premioCorrente = parseFloat(bicchiere.querySelector(".ammontare").textContent) || 0;
      let ammontare = arrotonda10Centesimi(totale * percentuale);

      // Gestisce l'ultimo bicchiere per bilanciare eventuali arrotondamenti
      if (index === bicchieri.length - 1) {
        ammontare = arrotonda10Centesimi(totale - totaleDistribuito);
      }

      console.log(`Bicchiere: ${tipo}, Percentuale: ${percentuale}, Ammontare: ${ammontare}`);

      // Somma al premio corrente
      const nuovoPremio = premioCorrente + ammontare;

      // Aggiorna il valore nel bicchiere
      bicchiere.querySelector(".ammontare").textContent = nuovoPremio.toFixed(2);
      bicchiere.querySelector(".per-giro").textContent = ammontare.toFixed(2);

      totaleDistribuito += ammontare;

      console.log(`Nuovo Premio: ${nuovoPremio}, Totale Distribuito: ${totaleDistribuito}`);
    });
  };

  // Funzione per azzerare un bicchiere
  const azzeraBicchiere = (bicchiere) => {
    bicchiere.querySelector(".ammontare").textContent = "0.00";
  };

  // Aggiungere listener ai pulsanti "Azzerare"
  bicchieri.forEach((bicchiere) => {
    bicchiere.querySelector(".azzera").addEventListener("click", () => {
      azzeraBicchiere(bicchiere);
    });
  });

  // Calcolare e aggiungere premi quando si clicca su "Calcola"
  calcolaButton.addEventListener("click", calcolaPremi);
});