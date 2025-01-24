
# Projeto Final - Personalização do Curso Back-End PretaLab

Neste projeto final, nós, alunas do PretaLab, fomos desafiadas a personalizar o projeto de conclusão do curso de Back-End. A minha personalização incluiu a implementação das funcionalidades de arquivar e desarquivar despesas. Além disso, aceitei o desafio de adicionar mais uma funcionalidade: a exclusão de despesas.

Para enriquecer ainda mais o aprendizado, sob a orientação da mentora Amanda Silva, também montamos o front-end do projeto. Isso nos permitiu expandir nosso conhecimento além do desenvolvimento back-end, aprendendo conceitos básicos de CSS e React. Dessa forma, não apenas desenvolvemos um back-end robusto e funcional, mas também criamos uma interface visual para interagir com as funcionalidades da aplicação.

Essa etapa foi uma oportunidade incrível para consolidar todo o conhecimento adquirido ao longo dos cinco meses de formação, aplicando os conceitos de forma prática e integrando tecnologias de front-end e back-end para criar uma solução completa e personalizada.

---
link da aplicaçao: https://front-aprofunda-03.vercel.app/
---

---

# Controle de Gastos com Gemini - Aprofunda Pretalab

Uma plataforma intuitiva para você controlar seus gastos e alcançar suas metas financeiras. Com o [Nome da sua aplicação], você pode:

- **Upload de notas fiscais:** Tire uma foto da sua nota e deixe que a nossa ferramenta faça o resto.
- **Dashboard personalizado:** Visualize seus gastos de forma clara e organizada.
- **Histórico detalhado:** Acompanhe todas as suas transações.
- **Conselhos financeiros:** Receba dicas personalizadas para melhorar suas finanças.

## Como funciona

1. **Tenha uma nota em PDF:** Tenha um arquivo salvo na sua máquina: sua nota fiscal.
2. **Faça o upload:** Envie o arquivo para a plataforma.
3. **Acompanhe seus gastos:** Veja seus gastos atualizados em tempo real no dashboard.

## 🔨 Funcionalidades

- **Upload de Imagens**: Permite que o usuário envie uma imagem da nota fiscal.
- **Reconhecimento de Caracteres (OCR)**: Utiliza uma API de OCR (Google Vision API ou Gemini) para extrair o valor da nota fiscal.
- **Atualização Automática do Dashboard**: Adiciona o valor reconhecido ao controle financeiro, exibindo o total no dashboard.
- **Histórico de Transações**: Exibe o histórico de gastos com detalhes de data, valor e categoria.
- **Autenticação de Usuário**: Para que cada usuário tenha um dashboard personalizado.

## ✔️ Tecnologias Utilizadas

### Frontend

- **Frontend:** React, Vite, Styled Components
- **Backend:** Node.js, Express, Firebase
- **OCR:** Google Vision API

### Infraestrutura e Deploy

- **Google Cloud Platform (GCP)**
  - **Google Cloud Functions** para processamento assíncrono de imagens
  - **Google Cloud Storage** para armazenar imagens enviadas
  - **Firestore** para banco de dados de transações

##

## Instalação

1. Clone o repositório:

   ```bash
   git clone [https://github.com/seuusuario/plataforma-gerenciamento-gastos.git](https://github.com/seuusuario/plataforma-gerenciamento-gastos.git)

   ```

2. Acesse o projeto e instale as dependências:
   ```bash
   cd plataforma-gerenciamento-gastos
   npm install
   ```

Estrutura de Arquivos

```
.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── redux/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   └── app.js
│   ├── package.json
└── README.md
```

## Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/seuusuario/plataforma-gerenciamento-gastos.git
   ```

```sh
   npm install
```

## Critérios de Aceite

1. Autenticação e Autorização de Usuário
   Dado que uma usuária tenta acessar o sistema,
   Quando ela insere suas credenciais válidas e faz login,
   Então o sistema deve autenticar a usuária e redirecioná-la ao seu dashboard personalizado, garantindo o acesso apenas a suas transações.

2. Processamento OCR (Reconhecimento de Texto)
   Dado que o upload de uma imagem foi concluído,
   Quando o sistema processa a imagem através da API OCR (Google Vision ou Gemini),
   Então o valor reconhecido na imagem deve ser extraído e associado à conta da usuária.

3. Atualização Automática do Dashboard
   Dado que o valor foi extraído com sucesso de uma nota fiscal,
   Quando o processamento é concluído e os dados são salvos no banco,
   Então o dashboard da usuária deve ser atualizado automaticamente com o novo valor, somando-o ao total de gastos.

4. Histórico de Transações
   Dado que a usuária tem transações registradas no sistema,
   Quando a usuária acessa a tela de histórico de transações,
   Então o sistema deve exibir uma lista de todas as transações, incluindo a data, o valor e a categoria de cada uma.

5. Upload de Imagem da Nota Fiscal
   Dado que a usuária está autenticada e acessa a funcionalidade de upload,
   Quando a usuária faz o upload de uma imagem válida da nota fiscal,
   Então o sistema deve exibir uma mensagem de confirmação de envio e iniciar o processamento OCR para extrair os dados.

6. Validação de Upload de Imagem
   Dado que a usuária tenta fazer upload de um arquivo,
   Quando o arquivo enviado não é uma imagem válida (não está nos formatos suportados ou o tamanho é excessivo),
   Então o sistema deve exibir uma mensagem de erro orientando sobre os requisitos de upload e impedir o envio até que as condições sejam atendidas.

7. Persistência de Dados
   Dado que uma transação foi adicionada com sucesso,
   Quando o sistema armazena o valor e os detalhes no banco de dados,
   Então esses dados devem ser persistidos no histórico, permitindo recuperação futura mesmo após logout ou atualização do sistema.

---
---

# Demosntração do front 

## tela 01: O home com long 
![image](https://github.com/user-attachments/assets/00d23bda-8d3f-4368-bb53-2217ee575b44)
![image](https://github.com/user-attachments/assets/1ee3d48c-7cbb-440c-89a2-c32e2ef99390)

## tela 02: Mostrando quatro opções (Home, criar despesas, dashboard e arquivados)
![image](https://github.com/user-attachments/assets/233dbab0-bae3-4625-8521-f553a3b529a8)

## tela 03:  criar despesas 
![image](https://github.com/user-attachments/assets/3250e2ab-5942-4ab0-b763-1ef57107c8cb)

## tela 04: lista de despesas de entradas e saida 
![image](https://github.com/user-attachments/assets/3ac2a7c6-2aee-472e-9a8a-f2d742ff1e96)

![image](https://github.com/user-attachments/assets/284fb5c0-fd4b-4ce7-bc80-016032a0e77e)
 ## ao arquivar  lista fica assimm:
 ![image](https://github.com/user-attachments/assets/293bdc58-2ccc-4403-9313-602a7fa1c11d)

 ## tela 05: Despesas arquivadas 
 ![image](https://github.com/user-attachments/assets/9bc04d5a-8042-4e62-9f19-78093d82aca3)

  ## desarquivar:
  ![image](https://github.com/user-attachments/assets/df79dae6-5fa4-45a9-8f3a-4907ae56220d)

  ## lista de aquivados 
  ![image](https://github.com/user-attachments/assets/7c3e28eb-239c-41a4-893d-0f0b440968ee)

## tela 06: Excluir despesa:
![image](https://github.com/user-attachments/assets/46deca6f-2c3f-453d-93c1-0c38b3a21d03)
  ## mostrando que foi exluido:
  ![image](https://github.com/user-attachments/assets/425c9b26-8012-443d-8359-7639dbfee3c3)










