const { SerialPort } = require("serialport");
let puerto;

function iniciarSerial(onData) {
  puerto = new SerialPort({
    path: "/dev/cu.usbserial-0001", // Cambia esto según tu puerto
    baudRate: 115200,
    autoOpen: true,
  });

  puerto.on("open", () => {
    console.log("Puerto serial abierto.");
  });

  puerto.on("data", (data) => {
    const texto = data.toString();
    console.log("Recibido:", texto);
    onData(texto);
  });

  puerto.on("error", (err) => {
    console.error("Error en puerto serial:", err.message);
  });
}

function enviarComando(comando) {
  if (puerto && puerto.isOpen) {
    puerto.write(comando + "\n");
  } else {
    console.warn("Puerto no abierto");
  }
}

module.exports = { iniciarSerial, enviarComando };
