const bcrypt = require("bcrypt");

(async () => {
  try {
    const senhaPlana = "vinieleleclinica123"; // Substitua pela senha desejada
    const hashedPassword = await bcrypt.hash(senhaPlana, 10); // Gera o hash com um "salt" de 10

    console.log("Senha criptografada:", hashedPassword);
  } catch (error) {
    console.error("Erro ao gerar o hash:", error);
  }
})();
