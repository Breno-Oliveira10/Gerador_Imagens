# Gerador de Imagens

## Descrição do Projeto

Este projeto utiliza a API da plataforma Glif app, que combina o modelo de geração de imagens SD3 com o processamento de linguagem natural do GPT4 e DALL·E 3. O objetivo é facilitar a criação de imagens de forma automatizada a partir de prompts de texto. O usuário insere uma descrição textual e a aplicação gera uma imagem correspondente.

## Demostração

https://github.com/user-attachments/assets/9effdff9-c3cd-41e3-9758-86bf4ceac793

## Configuração e Execução
1. **Clone o repositório:**

    ```bash
    git clone https://github.com/Breno-Oliveira10/Gerador_Imagens.git
    cd Gerador_Imagens
    ```
2. **Instalar o virtualenv (se ainda não tiver instalado), necessário instalar apenas uma vez.** Na pasta que está o projeto, no terminal do VSCode, execute:

    ```bash
    pip install virtualenv
    ```

3. **Crie e ative um ambiente virtual (opcional, mas recomendado):**

    No diretório/pasta onde você deseja criar o ambiente virtual, no terminal execute:

    ```bash
    virtualenv nome_do_ambiente
    ```

4. **Ativar o ambiente virtual:**

    - No Windows:

        ```bash
        nome_do_ambiente\Scripts\activate
        ```

    - No macOS/Linux:

        ```bash
        source nome_do_ambiente/bin/activate
        ```

5. **Instale as dependências:**

    ```bash
    pip install -r requirements.txt
    ```

6. **Configurar token de API e ID do modelo Glif que vai usar:**

    Vá para a página [https://glif.app/settings/api-tokens](https://glif.app/settings/api-tokens) para gerar seu token único.

7. **Acesse a documentação da Glif aqui:** [https://docs.glif.app/api/getting-started](https://docs.glif.app/api/getting-started), para saber como executar glifs via API.

8. **Crie um arquivo chamado `config.py` na raiz do projeto e adicione suas configurações assim:**

    ```python
    AUTH_TOKEN = "SEU_TOKEN_API_AQUI"
    GLIF_URL = "https://simple-api.glif.app/ID_DO_MODELO_QUE_VAI_USAR_AQUI"
    ```

    Exemplo:

    ```python
    GLIF_URL = "https://simple-api.glif.app/cm2ux6uhd0005jtwsifb0g11g"
    ```

    Esse ID já vem na proporção 16:9 por padrão, o ID usa o Modelo: **SD3 with GPT4 DALL·E 3 prompt preprocess**. O ID original do modelo fica em: [https://glif.app/@Nikitendo/glifs/clvi3lboo0005r3kjajkcuid4](https://glif.app/@Nikitendo/glifs/clvi3lboo0005r3kjajkcuid4).

9. **Iniciar a aplicação:**

    Execute assim para ativar o ambiente:

    - No Windows:

        ```bash
        nome_do_ambiente\Scripts\activate
        ```

    - No macOS/Linux:

        ```bash
        source nome_do_ambiente/bin/activate
        ```

    Em seguida, execute:

    ```bash
    python app.py
    ```

    para rodar a aplicação.

10. **Acessar a aplicação:**

    Abra seu navegador e vá para [http://127.0.0.1:5000/](http://127.0.0.1:5000/). Insira um prompt de texto no campo apropriado. Clique em "Gerar Imagem". A imagem gerada será exibida na tela, com opção para baixar.
