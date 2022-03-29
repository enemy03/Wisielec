class Draw {
    constructor() {
        this.words = ['Sobel', 'Solar', 'Bedoes', 'White', 'Reto', 'Sokół', 'Tede', 'Mata', 'żabson', 'Kizo', 'Pezet', 'Kali'];
        this.word = ''
    }

    createWord() {
        const random = Math.floor(Math.random() * this.words.length);
        this.word = this.words[random];
    }

    getWord() {
        return this.word
    }
}
const draw = new Draw();

class Board {
    constructor() {
        this.index = [];
    }
    checkWord(e) {
        const letter = e.target;
        const letterText = e.target.textContent;
        let index = 0;
        const word = draw.getWord();
        for (let i = 0; i < word.length; i++) {
            if (word.toLowerCase().charAt(index) === letterText.toLowerCase()) {
                board.index.push(index)
            }
            index++
        }
    }
    getIndex() {
        return this.index
    }
}

const board = new Board();

class UI {
    constructor() {
        this.btn = document.getElementById('startGame');
        this.h2 = document.querySelector('h2.result');
        this.img = document.querySelectorAll('.img');
        this.id = 0;
    }

    render(e) {
        draw.createWord(e);
        for (let i = 0; i < draw.word.length; i++) {
            if (draw.word.search('_') + 1) {
                ui.createSpan().textContent = `  `
            }
            ui.createSpan().textContent = ` _ `

        }
        document.querySelector('.category h3 span').textContent = 'Raper'
        document.querySelectorAll('.letter').forEach(le => {
            le.addEventListener('click', ui.startGame)
        })
    }

    createSpan() {
        const span = document.createElement('span');
        this.h2.appendChild(span);
        return span
    }

    startGame(e) {
        board.checkWord(e);
        const aside = document.querySelector('aside');
        const asideH2 = document.querySelector('aside h2');
        const letter = e.target;
        if (board.index.length > 0) {
            for (let i = 0; i < board.index.length; i++) {
                document.querySelectorAll('span')[board.index[i]].textContent = letter.textContent;
            }
            letter.classList.add('green')
            board.index = [];
            if (draw.getWord().toUpperCase() === ui.h2.textContent) {
                aside.classList.add('green');
                asideH2.textContent = "Wygrałeś !!!"

            }
        } else {
            ui.img[ui.id].classList.add('show');
            letter.classList.add('red');
            ui.id++
            if (ui.id === 11) {
                aside.classList.add('red');
                asideH2.textContent = "Przegrałeś !!!"
            }
        }
    }

    resetGame() {
        draw.word = '';
        ui.h2.textContent = '';
        ui.img.forEach(img => {
            img.classList.remove('show')
        })
        document.querySelectorAll('.letter').forEach(le => {
            le.classList.remove('green');
            le.classList.remove('red');

        });
        ui.id = 0;
        document.querySelectorAll('.letter').forEach(le => {
            le.removeEventListener('click', ui.startGame)
        })

    }
}

const ui = new UI

document.getElementById('startGame').addEventListener('click', ui.render)

document.querySelector('aside .imgAs').addEventListener('click', () => {
    document.querySelector('aside').classList.remove('red');
    document.querySelector('aside').classList.remove('green');
})

document.getElementById('reset').addEventListener('click', ui.resetGame)