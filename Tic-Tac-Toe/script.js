document.addEventListener('DOMContentLoaded', () => {
    let page = document.documentElement;
    let board = document.getElementById("board");
    let button = document.getElementsByClassName("button");
    btnArray = Array.from(button);
    let restart = document.getElementById("restart");
    let turns = document.getElementById("turns");
    let winner = document.getElementById("winner");
    let theme = document.getElementById("theme");
    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let players = ["X", "O"];
    let currentPlayer = "X";
    let player_won = false;

    turns.innerText = `${currentPlayer}'s turn ! `
    game();

    function game() {
        for (let i = 0; i < btnArray.length; i++) {
            btnArray[i].addEventListener("click", () => {
                btnArray[i].innerText = currentPlayer;
                btnArray[i].classList.add("text");
                if (checkWin()) {
                    btnArray.forEach(element => {
                        element.disabled = true;
                    });
                }
                else {
                    if (draw()) {
                        winner.innerText = ("Draw!");
                        turns.classList.add("hidden");
                        btnArray.forEach(element => {
                            element.disabled = true;
                        });
                    };
                }
                currentPlayer = (currentPlayer == players[0]) ? players[1] : players[0];
                turns.innerText = `${currentPlayer}'s turn ! `
            })
            reset();
        }
    }


    function checkWin() {
        for (let i = 0; i < win.length; i++) {
            const [a, b, c] = win[i];
            if (btnArray[a].innerText == currentPlayer && btnArray[b].innerText == currentPlayer && btnArray[c].innerText == currentPlayer) {
                btnArray[a].classList.add("win");
                btnArray[b].classList.add("win");
                btnArray[c].classList.add("win");
                player_won = true;
                winner.innerText = ("Player " + currentPlayer + " Wins!");
                turns.classList.add("hidden");
                return true;
            }
        }
        return false;
    }

    function draw() {
        for (let i = 0; i < btnArray.length; i++) {
            if (btnArray[i].textContent === '') {
                return false;
            }
        }  //If the loop finishes without finding any empty buttons, that means all are filled — so it returns true, indicating a tie.
        return true
    }


    function reset() {
        restart.addEventListener("click", () => {
            currentPlayer = "X"
            turns.classList.remove("hidden");
            turns.innerText = `${currentPlayer}'s turn ! `
            btnArray.forEach(i => {
                i.innerText = ("");
                winner.innerText = "";
            });
            btnArray.forEach(element => {
                element.disabled = false;
                element.classList.remove("win");
            });
        });

    }
    theme.addEventListener("click", () => {
       page.classList.toggle("dark");
        if (page.classList.contains("dark")) {
            theme.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 16">
  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
</svg>`
        }
        else {
            theme.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16">
         <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
      </svg>`}
    });   
});
   



/* function toggleTheme(){
        let currentTheme =localStorage.getItem("mode");
        if(currentTheme == "dark"){
            page.classList.add("dark")
            theme.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 16">
  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
</svg>`
        }else{
            page.classList.remove("dark")
        }
    } */