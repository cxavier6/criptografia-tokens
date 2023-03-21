import jwt from 'jsonwebtoken';

const chaveSecreta = "chaveSuperSecreta"

const token = jwt.sign(
    {
        apelido: "camila",
        curso: "node.js",
    }, 
    chaveSecreta
);

console.log(token) 

/**
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGVsaWRvIjoiY2FtaWxhIiwiY3Vyc28iOiJub2RlLmpzIiwiaWF0IjoxNjc5MzU5ODQwfQ.TFUR-oZCF-3dNHELZTJCRJWgQ3wt8J-BU87ldNVJ_S8 
 */

const tokenDecodificado = jwt.verify(token, chaveSecreta)

console.log(tokenDecodificado)

/**
 * { apelido: 'camila', curso: 'node.js', iat: 1679359840 }
 */