document.getElementById("menu-btn").addEventListener("click", () => {
    document.getElementById("mobile-menu").classList.toggle("hidden");
});

function validateWalletAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

function manualConnect() {
    const walletInput = document.getElementById("walletInput").value.trim();
    const statusElement = document.getElementById("walletStatus");

    if (!walletInput) {
        statusElement.textContent = "Please enter a wallet address!";
        statusElement.classList.add("text-red-400");
        return;
    }

    if (!validateWalletAddress(walletInput)) {
        statusElement.textContent = "Invalid wallet address!";
        statusElement.classList.add("text-red-400");
        return;
    }

    localStorage.setItem("walletAddress", walletInput);
    statusElement.textContent = `Connected: ${walletInput}`;
    statusElement.classList.remove("text-red-400");
    statusElement.classList.add("text-green-400");
}

async function connectWallet() {
    const statusElement = document.getElementById("walletStatus");

    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            const walletAddress = accounts[0];

            if (!validateWalletAddress(walletAddress)) {
                statusElement.textContent = "Invalid wallet address!";
                statusElement.classList.add("text-red-400");
                return;
            }

            localStorage.setItem("walletAddress", walletAddress);
            statusElement.textContent = `Connected: ${walletAddress}`;
            statusElement.classList.add("text-green-400");
        } catch (error) {
            console.error(error);
            statusElement.textContent = "Connection failed!";
            statusElement.classList.add("text-red-400");
        }
    } else {
        statusElement.textContent = "MetaMask not detected!";
        statusElement.classList.add("text-red-400");
    }
}

function showTooltip() {
    document.getElementById('walletTooltip').classList.remove('hidden');
}

function hideTooltip() {
    document.getElementById('walletTooltip').classList.add('hidden');
}
