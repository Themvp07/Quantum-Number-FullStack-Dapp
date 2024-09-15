const contractAddress = "0x15b16CD563c8B550924b7fb56F60DaF13248B2C7";
const abi = [ 
    {
        "inputs": [],
        "name": "getRandomNumber",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "makeRequestUint256",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let counter = 0;
let interval = null; // Solo un intervalo para manejar el contador y la lectura
let initialNumber = null; // Variable para almacenar el número inicial

// Solicitar número aleatorio
document.getElementById("requestButton").addEventListener('click', async () => {
    document.getElementById("state").innerText = "Petición iniciada"; // Cambiar a "Petición iniciada"
    await requestRandomNumber();
});

async function requestRandomNumber() {
    startCounter(); // Iniciar el contador al hacer la petición

    // Asegúrate de que MetaMask esté disponible
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        await ethereum.request({ method: 'eth_requestAccounts' }); // Pide permisos a MetaMask
        const contract = new web3.eth.Contract(abi, contractAddress);

        try {
            // Llamada a makeRequestUint256
            const transaction = await contract.methods.makeRequestUint256().send({
                from: ethereum.selectedAddress
            });

            console.log("Transacción enviada:", transaction);
            console.log("Request Id:", transaction.events.RequestedUint256.returnValues.requestId);
        } catch (error) {
            console.error("Error solicitando número aleatorio:", error);
        }
    } else {
        alert('Por favor, instala MetaMask para usar esta aplicación.');
    }
}

async function loadCurrentNumber() {
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abi, contractAddress);
        try {
            const number = await contract.methods.getRandomNumber().call();
            initialNumber = number; // Guardar el número inicial
            document.getElementById("randomNumber").innerText = number;
        } catch (error) {
            console.error("Error leyendo el número aleatorio:", error);
        }
    } else {
        alert('Por favor, instala MetaMask para usar esta aplicación.');
    }
}

// Función para iniciar el contador y la lectura del número aleatorio
document.getElementById("startCounterButton").addEventListener('click', () => {
    startCounter(); // Iniciar el contador
});

// Función para detener el contador
document.getElementById("stopCounterButton").addEventListener('click', () => {
    stopCounter(); // Detener el contador
});

// Función para iniciar el contador
function startCounter() {
    if (!interval) {
        interval = setInterval(async () => {
            counter++;
            document.getElementById("counter").innerText = counter;

            if (typeof window.ethereum !== 'undefined') {
                const web3 = new Web3(window.ethereum);
                const contract = new web3.eth.Contract(abi, contractAddress);
                try {
                    const number = await contract.methods.getRandomNumber().call();
                    document.getElementById("randomNumber").innerText = number;

                    // Verificar si el número ha cambiado
                    if (number !== initialNumber) {
                        document.getElementById("updateMessage").innerText = "Nuevo número aleatorio actualizado";
                        document.getElementById("state").innerText = "Petición completada"; // Cambiar a "Petición completada"
                        initialNumber = number; // Actualizar el número inicial
                        stopCounter(); // Detener el contador
                    }
                } catch (error) {
                    console.error("Error leyendo el número aleatorio:", error);
                }
            } else {
                alert('Por favor, instala MetaMask para usar esta aplicación.');
            }
        }, 5000); // Incrementa cada 5 segundos
    }
}

// Función para detener el contador
function stopCounter() {
    if (interval) {
        clearInterval(interval); // Detener el intervalo
        interval = null; // Reiniciar la variable del intervalo
        document.getElementById("updateMessage").innerText = ""; // Limpiar mensaje de actualización
    }
}

// Cargar el número aleatorio actual al cargar la página
window.onload = loadCurrentNumber;
