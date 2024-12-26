document.addEventListener("DOMContentLoaded", () => {
  const numCartelleInput = document.getElementById("numCartelle");
  const costoCartellaInput = document.getElementById("costoCartella");
  const calcolaButton = document.getElementById("calcola");
  const totaleDaDividereElement = document.getElementById("totaleDaDividere");
  const bicchieri = document.querySelectorAll(".bicchiere:not([data-bicchiere='ambo'], [data-bicchiere='terno'], [data-bicchiere='quaterna'], [data-bicchiere='quintina'], [data-bicchiere='tombola'])");

  const numCartelleTombolaInput = document.getElementById("numCartelleTombola");
  const costoCartellaTombolaInput = document.getElementById("costoCartellaTombola");
  const calcolaTombolaButton = document.getElementById("calcolaTombola");
  const totaleDaDividereTombolaElement = document.getElementById("totaleDaDividereTombola");
  const bicchieriTombola = document.querySelectorAll(".bicchiere[data-bicchiere='ambo'], .bicchiere[data-bicchiere='terno'], .bicchiere[data-bicchiere='quaterna'], .bicchiere[data-bicchiere='quintina'], .bicchiere[data-bicchiere='tombola']");

  // Funzione per arrotondare ai 10 centesimi più vicini
  const arrotonda10Centesimi = (valore) => Math.round(valore * 10) / 10;

  // Funzione per aggiornare l'icona del bicchiere
  const aggiornaIconaBicchiere = (bicchiere) => {
    const ammontare = parseFloat(bicchiere.querySelector(".ammontare").textContent) || 0;
    const azzeraButton = document.querySelector(`.azzera-piccolo[data-bicchiere='${bicchiere.getAttribute("data-bicchiere")}'] i`);
    if (ammontare === 0) {
      azzeraButton.classList.remove("fa-wine-glass");
      azzeraButton.classList.add("fa-wine-glass-empty");
    } else {
      azzeraButton.classList.remove("fa-wine-glass-empty");
      azzeraButton.classList.add("fa-wine-glass");
    }
  };

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

      // Aggiorna l'icona del bicchiere
      aggiornaIconaBicchiere(bicchiere);
    });
  };

  // Funzione per calcolare i premi della Tombola
  const calcolaPremiTombola = () => {
    const numCartelle = parseInt(numCartelleTombolaInput.value, 10) || 0;
    const costoCartella = parseFloat(costoCartellaTombolaInput.value) || 0;
    const totale = numCartelle * costoCartella;

    console.log(`Totale Tombola: ${totale}`);

    // Aggiorna il totale dei soldi che vanno divisi
    totaleDaDividereTombolaElement.textContent = totale.toFixed(2);

    // Verifica che la somma delle percentuali faccia 100%
    let sommaPercentuali = 0;
    bicchieriTombola.forEach((bicchiere) => {
      const percentualeInput = bicchiere.querySelector(".percentuale");
      const percentuale = parseFloat(percentualeInput.value) || 0;
      sommaPercentuali += percentuale;
    });

    if (sommaPercentuali !== 100) {
      alert("La somma delle percentuali deve essere 100%");
      return;
    }

    // Calcola i premi
    bicchieriTombola.forEach((bicchiere) => {
      const tipo = bicchiere.getAttribute("data-bicchiere");
      const percentualeInput = bicchiere.querySelector(".percentuale");
      const percentuale = parseFloat(percentualeInput.value) / 100;
      const ammontare = arrotonda10Centesimi(totale * percentuale);

      console.log(`Bicchiere: ${tipo}, Percentuale: ${percentuale}, Ammontare: ${ammontare}`);

      // Aggiorna il valore nel bicchiere
      bicchiere.querySelector(".ammontare").textContent = ammontare.toFixed(2);

      // Aggiorna l'icona del bicchiere
      aggiornaIconaBicchiere(bicchiere);
    });
  };

  // Funzione per azzerare un bicchiere
  const azzeraBicchiere = (bicchiere) => {
    bicchiere.querySelector(".ammontare").textContent = "0.00";
    // Aggiorna l'icona del bicchiere
    aggiornaIconaBicchiere(bicchiere);
  };

  // Aggiungere listener ai pulsanti "Azzerare"
  bicchieri.forEach((bicchiere) => {
    bicchiere.querySelector(".azzera").addEventListener("click", () => {
      azzeraBicchiere(bicchiere);
    });
  });

  // Aggiungere listener ai piccoli pulsanti "Azzerare"
  const azzeraPiccoloButtons = document.querySelectorAll(".azzera-piccolo");
  azzeraPiccoloButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const bicchiere = document.querySelector(`.bicchiere[data-bicchiere='${button.getAttribute("data-bicchiere")}']`);
      azzeraBicchiere(bicchiere);
    });
  });

  // Calcolare e aggiungere premi quando si clicca su "Calcola"
  if (calcolaButton) {
    calcolaButton.addEventListener("click", calcolaPremi);
  }

  if (calcolaTombolaButton) {
    calcolaTombolaButton.addEventListener("click", calcolaPremiTombola);
  }
});