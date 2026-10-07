// Menggunakan WSS port 8084 dari EMQX agar tidak diblokir browser
const mqttClient = mqtt.connect('wss://broker.emqx.io:8084/mqtt');

mqttClient.on('connect', function () {
    console.log('Terhubung ke MQTT Broker!');
});

mqttClient.on('error', function (err) {
    console.error('MQTT Error:', err);
});

const ledButtons = document.querySelectorAll(".led-button");

ledButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const id = button.id.split("-")[2];
        const image = document.getElementById(`led-image-${id}`);

        if (button.textContent.trim() === "TURN ON") {
            image.src = "assets/led-on.png";
            button.textContent = "TURN OFF";
            mqttClient.publish(`proyek-ku/lampu/${id}`, "1");
        } else {
            image.src = "assets/led-off.png";
            button.textContent = "TURN ON";
            mqttClient.publish(`proyek-ku/lampu/${id}`, "0");
        }
    });
});

const fanButtons = document.querySelectorAll(".fan-button");

fanButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        if (button.textContent.trim() === "TURN ON") {
            button.textContent = "TURN OFF";
        } else {
            button.textContent = "TURN ON";
        }
    });
});