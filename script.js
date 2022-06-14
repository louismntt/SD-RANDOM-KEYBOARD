var wordCount = 0;

// timer target
const timer = document.getElementById('timer');
var time = 0;
var timerActive = false;

// sentence to write
const sentenceArray = [
  "un",
  "chien",
  "mange",
  "une",
  "pomme",
  "bien",
  "rouge"

]

//target inputField
const inputField = document.getElementById('inputField');

// targetField base content
const targetField = document.getElementById('targetField');
targetField.innerHTML = sentenceArray[0];

keyBoardRandomized = false;

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      // "1",
      // "2",
      // "3",
      // "4",
      // "5",
      // "6",
      // "7",
      // "8",
      // "9",
      // "0",
      "a",
      "z",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      // "caps",
      "q",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "m",
      "enter",
      // "done",
      "w",
      "x",
      "c",
      "v",
      "b",
      "n",
      "'",
      "backspace",

      ",",
      ":",
      "space",

      ".",
      "?",
    ];

    if (keyBoardRandomized) {
      keyLayout.sort(() => Math.random() - 0.5);
      insertLineBreak = "";


    }
    console.log(keyLayout)

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    // create keyboard
    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      // const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;
      var insertLineBreak = ["backspace", "p", "enter"].indexOf(key) !== -1;
      if (keyBoardRandomized) {
        insertLineBreak = "";
      }

      // const insertLineBreak = "";


      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          let drag = false;

          function keyPressed(obj) { // mettre le this dans les parenthèses

            // var audio = new Audio('keyboard-sound.mp3');
            // audio.play();

            obj.properties.value += obj.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            obj._triggerEvent("oninput");
            // confirmInput();
            //console.log(confirmInput());
            if (confirmInput()) {
              console.log('YEAH YEAH YEAH');
              wordCount++;
              setNewWord(wordCount);
              obj.properties.value = "";

              if (wordCount == 1) {

                obj.close();
                obj._triggerEvent("onclose");
                keyBoardRandomized = true;

                Keyboard.init();
                Keyboard.open();
                inputField.focus();

              }

              if (wordCount >= sentenceArray.length) {
                var winH1 = document.getElementById('win-h1');
                winH1.style.display = "block";
                winH1.innerHTML = "Bravo ! Tu as réussi à écrire 'un chien mange une pomme bien rouge' en seulement " + Math.round(time / 1000) + " secondes !"
                console.log('WIN WIN WIN');
              }

            }

          };

          // keyElement.addEventListener("click", () => {
          //   keyPressed(this);
          // });

          const delta = 10;
          let startX;
          let startY;

          keyElement.addEventListener('mousedown', () => {
            startX = event.pageX;
            startY = event.pageY;
          });

          keyElement.addEventListener('mouseup', () => {
            const diffX = Math.abs(event.pageX - startX);
            const diffY = Math.abs(event.pageY - startY);

            if (diffX < delta && diffY < delta) {
              // Click!
              keyPressed(this);
              console.log(this);

            }
          });

          // keyElement.addEventListener("click", () => {
          //   this.properties.value
          //   += this.properties.capsLock
          //     ? key.toUpperCase()
          //     : key.toLowerCase();
          //   this._triggerEvent("oninput");
          //    confirmInput();
          //   console.log(confirmInput());
          //   if (confirmInput()) {
          //     console.log('YEAH YEAH YEAH');
          //     wordCount++;
          //     setNewWord(wordCount);
          //     this.properties.value = "";
          //
          //     if (wordCount == 2) {
          //
          //       this.close();
          //       this._triggerEvent("onclose");
          //       keyBoardRandomized = false;
          //
          //       Keyboard.init();
          //       Keyboard.open();
          //       inputField.focus();
          //
          //     }
          //
          //     if (wordCount >= sentenceArray.length) {
          //       var winH1 = document.getElementById('win-h1');
          //       winH1.style.display = "block";
          //       winH1.innerHTML = "Bravo ! Tu as réussi à écrire 'des pianistes font la promesse de manger des os' en seulement " + Math.round(time/1000) + " secondes !"
          //       console.log('WIN WIN WIN');
          //     }
          //
          //
          //
          //   }
          //
          // });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");

    if (timerActive == false) {
      timerActive = true;
      var timerCounting = setInterval(function() {
        time += 100;
        timer.innerHTML = "Temps : " + Math.round(time / 1000) + "s";
      }, 100);
    }

  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", function() {
  Keyboard.init();
});

// CREATING THE GAME INTERACTION

function setNewWord(n) {
  // inputField.value = sentenceArray[n];
  inputField.value = "";
  if (n < sentenceArray.length) {
    targetField.innerHTML = sentenceArray[n];
  } else {
    targetField.innerHTML = "";
  }
}

function confirmInput() {
  // console.log('function executed, should return smthng');

  if (inputField.value == targetField.innerHTML) {
    // inputField.value = "";
    // this.properties.value = "";
    return true;
  } else {
    return false;
  }
}

// confirmInput();
