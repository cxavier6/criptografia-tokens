import { generateKeyPairSync, createSign, createVerify } from 'crypto';

const { privateKey, publicKey } = generateKeyPairSync
('rsa', {
    modulusLength: 2048,

    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    },
});

let documento = "Essa string vai ser assinada"

//Assinatura ----- chave privada

const assinador = createSign('rsa-sha256');

assinador.update(documento);

const assinatura = assinador.sign(privateKey, 'hex');

console.log(`Assinatura: ${assinatura}`);

//Intermediário

// documento += 'Arquivo alterado' (Invalida assinatura)

//Envio do documento ----- Documento, assinatura e chave pública

const verificador = createVerify('rsa-sha256');

verificador.update(documento);

const ehVerificado = verificador.verify(publicKey, assinatura, 'hex');

console.log(ehVerificado)