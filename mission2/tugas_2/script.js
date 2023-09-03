const char = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const playerScore = document.getElementById("score");
const startMessage = document.getElementById("startMessage")

let score = 0;
    let interval = null;

    let jumlahScore = () => {
        score++;
        playerScore.innerHTML = `Score: ${score}`;
    }

    function jump(event) {
        if (event.keyCode === 32 && char.classList != "animate") {
            char.classList.add("animate");
            setTimeout(function () {
                char.classList.remove("animate");
            }, 500);
            clearInterval(interval);
            interval = setInterval(jumlahScore, 100);
            startGame(); // Mulai permainan saat tombol ditekan
        }
    }

    const ifHitCactus = setInterval(function () {
        const charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));
        const charLeft = parseInt(window.getComputedStyle(char).getPropertyValue("left"));
        const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

        if (charLeft + 50 > cactusLeft && charLeft < cactusLeft + 50 && charTop >= 60) {
            clearInterval(ifHitCactus);
            cactus.style.animation = "none";
            cactus.style.display = "none";
            if (confirm("Dino menabrak kaktus, ingin mengulang?")) {
                window.location.reload();
            }
        }
    }, 10);

    // Fungsi untuk memulai permainan
    function startGame() {
        document.body.removeEventListener("keydown", jump); // Hapus event listener jump
        startMessage.style.display = "none"; // Sembunyikan pesan start
    }

    // Tambahkan event listener untuk memulai permainan
    document.body.addEventListener("keydown", jump);