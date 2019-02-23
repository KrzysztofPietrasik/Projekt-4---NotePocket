let noteWrapper = document.querySelector('.note-wrp');
let inputNoteWrp = document.querySelector('.input-note');

let addNoteBtn = document.querySelector('.input-note button');
addNoteBtn.addEventListener('click', ()=>{
  let note = new Note(); //stworz nowa notatke
});

let topLocation;
noteWrapper.addEventListener('click', (e)=>{
  if (e.target.matches('button')) { //jesli nacisnieto na button
    topLocation = e.target.dataset.location;
    let note = JSON.parse(localStorage.getItem(topLocation));
    Note.createNoteDivTop(topLocation, note); //dodaj notatke do top
  }
});

class Note {
  constructor() {
    Note.itemIterator = localStorage.length? localStorage.length+1: 1; //iteratot aktualnego elemntu
    this.note = {};
    const title = document.querySelector('.input-note__title').value;
    const body = document.querySelector('.input-note textarea').value;
    if (title && body) { //jesli posiada cialo i tytul stworz obiekt w ktorym te dane przechwoasz
      this.note['title'] = title;
      this.note['body'] = body;
      this.note.date = new Date();
      this.note.color = this.getRandomColor();
      this.setNoteLocal(); //wpisz ten obeikt do local storage
    }
  }
  setNoteLocal(){
    localStorage.setItem(Note.itemIterator, JSON.stringify(this.note)); //zapisany jako json wpisz do local storage
    location.reload(); //odswiez strone
  }
  static createNoteDivTop(key, note){ //stworz notatka na top
    let newNoteDiv = document.createElement('div'); //stworz diva, poniozej dodaj do niego tytul, tresc itd. dodaj wlasciwosci
    newNoteDiv.setAttribute('class', 'note');
    newNoteDiv.className += ' border-bold';
    newNoteDiv.style.background = note.color;
    let newNoteTitleH2 = document.createElement('h2');
    newNoteTitleH2.innerText = note.title;
    let newNoteBody = document.createElement('p');
    newNoteBody.innerText = note.body;
    let newNoteDate = document.createElement('p');
    newNoteDate.setAttribute('class', 'note__date');
    newNoteDate.innerText = this.toDate(note.date);;
    let newImportantDiv = document.createElement('div');
    newImportantDiv.innerText = 'Top';
    newImportantDiv.style.textAlign = 'center';

    newNoteDiv.appendChild(newImportantDiv);
    newNoteDiv.appendChild(newNoteTitleH2);
    newNoteDiv.appendChild(newNoteBody);
    newNoteDiv.appendChild(newNoteDate);

    inputNoteWrp.appendChild(newNoteDiv);
  }

  static getNotes(){
    for (let i = 0; i < localStorage.length; i++) { //dla kazdego obiektu z localStorage
      const key = localStorage.key(i);
      let note = JSON.parse(localStorage.getItem(key)); //pobierz obiekt/notatke

      if (key == topLocation) {
        createNoteDiv(key, note);
      }

      let newNoteDiv = document.createElement('div'); //stworz diva na notattke i odpowiednie elemnty
      newNoteDiv.setAttribute('class', 'note');
      newNoteDiv.style.background = note.color;

      let newNoteTitleH2 = document.createElement('h2');
      newNoteTitleH2.innerText = note.title;
      let newNoteBody = document.createElement('p');
      newNoteBody.innerText = note.body;
      let newNoteDate = document.createElement('p');
      newNoteDate.setAttribute('class', 'note__date');
      newNoteDate.innerText = this.toDate(note.date);;
      let newNoteBtn = document.createElement('button');
      newNoteBtn.dataset.location = key;
      newNoteBtn.setAttribute('class', 'note__btn');
      newNoteBtn.style.fontSize = '10px';
      newNoteBtn.innerText = 'Dodaj na początek';

      newNoteDiv.appendChild(newNoteTitleH2);
      newNoteDiv.appendChild(newNoteBody);
      newNoteDiv.appendChild(newNoteDate);
      newNoteDiv.appendChild(newNoteBtn);

      noteWrapper.appendChild(newNoteDiv); //dodaj diva z elementami do strony
    }
  }
  getRandomColor() { //generowanie randomowego koloru
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  static toDate(today){ //zapisz date w prostszej formie
    var today = new Date(today);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    today = mm + '-' + dd + '-' + yyyy;
    return today;
  }
  clearStorage(){
    localStorage.clear();
  }
}

window.onload = function (){
  Note.getNotes(); //przy zaladowaniu strony wyswietl notatki
}
