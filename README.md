# Criptografia e tokens JWT com Node.js

## Criptografia

Criptografia é a prática de proteger informações por meio do uso de algoritmos codificados, hashes e assinaturas. -- [AWS](https://aws.amazon.com/pt/what-is/cryptography/)

### Funções de hash

Uma função irreversível. Depois de criptografada não pode ser descriptografada.

Existem vários tipos de hash, chamados de algoritmos criptográficos: MD5, SHA1, SHA-256.

#### Criando hash com módulo crypto

Com o módulo `crypto` pode-se criar um hash. Este módulo é nativo do node, basta importá-lo para começar a utilizar.

Importando o módulo:

```javascript
import { createHash } from 'crypto';
```

Criando a função e exibindo no console com o comando `node hash.js` no terminal:

```javascript
function criaHash(senha) {
    return createHash('sha256').update(senha).digest('hex');
}

console.log(criaHash('uma senha de teste'));
```

Resultado: `6e55a1a8926eba6f8ac38c2e743ba1a653b89b4fd10bb1bfde29b92400db2a6e`

### Hash com "sal"

Para evitar vulnerabilidade de alguém tentar adivinhar a senha com uma lista de hash feitas anteriormente, utiliza-se de hash com "sal" que nada mais é do que adicionar outro dado a senha, ou seja, a hash será gerada a partir de dois parâmetros. 

O “sal” na função de hash ajuda prevenir o ataque rainbow table por fazer com que toda senha, até mesmo senhas iguais, tenham hashes diferentes, impossibilitando ataques que utilizam listas de hashes para descobrir senhas a partir de hashes iguais.

### Encriptação simétrica

Um algoritmo que precisa de uma chave compartilhada para cifrar/decifrar uma informação. Neste método é possível decifrar a mensagem, já que os hashs foram feitos para não serem decifrados.

Utilizando os métodos `createCipheriv` e `createDecipheriv` para cifrar e decifrar e o `randomBytes` para gerar valores aleatórios.

>Cifrado: 31c722cec15e472720df0e60a69a9c83c89e3b70c55ebf827e47b4fd152c56b8
Decifrado: Teste de mensagem

### Encriptação assimétrica

Com a encriptação simétrica, qualquer pessoa que consiga ter acesso a chave compatilhada pode decifrar uma mensagem.

Desse modo, na assimétrica, tem duas chaves: 

- Chave pública: responsável pela encriptação e pode ser compartilhada.
- Chave privada: responsável pela desencriptação e não deve ser compartilhada.

>"Mensagem secreta" -> **chave pública** -> `hgf3a51f3bfghdf6bb680a213a` -> **chave privada** -> "mensagem secreta"

### Assinatura

A assinatura é uma forma de validar a autoria de algo. Neste contexto, a **chave privada** é utilizada para criar a assinatura digital (que seria como a hash de um documento) e **chave pública** é utilizada para criar um novo documento e verificar a assinatura. Ou seja, é feito uma comparação entre o documento recebido e o documento gerado pela chave pública, de forma que os dois devem ser iguais para que seja válido.

![image](https://user-images.githubusercontent.com/79461028/226415487-a759a822-b47c-4098-a07a-b18b50e7b6a7.png)

Utilizando os métodos `generatePairSync`, `createSign` e `createVerify` do módulo `crypto`.

### Sessões

Sessão é a quantidade de tempo em que o usuário está autenticado e conectado a um serviço ou um sistema.

O servidor cria um identificador único(ID) para notificar que o usuário está logado, depois vai guardar o valor desse ID e enviar para o usuário. O usuário, por sua vez, vai guardar esse ID seja por cookies ou local storage para quando realizar novas requisições ao servidor poder enviar apenas o ID e não precisar logar novamente.
### Tokens

O token gerado pelo servidor é enviado ao usuário no qual quando houver outra requisição esse token vai ser verificado pelo servidor.

![image](https://cdn1.gnarususercontent.com.br/1/723333/747c3a63-c3b4-4c94-9cc3-55cb71c1013e.png)

### Token JWT

JWT significa **J**son **W**eb **T**oken. Possui a seguinte estrutura: Cabeçalho (header), Dados (payload) e Assinatura.

```javascript
//Cabeçalho
{
    "alg": "HS256",
    "typ": "JWT"
}
//Dados
{
    "sub": "1234567890",
    "name": "John Doe",
    "curso": "Node.js",
    "iat": "1516239022"
}
//Assinatura
HMACSHA256(
    base64UrlEncode(header) + "." + base64UrlEncode(payload), segredo
)
```
## Documentação

- [Crypto (Node.js)](https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options)
- [JSON Web Tokens](https://jwt.io/introduction)
