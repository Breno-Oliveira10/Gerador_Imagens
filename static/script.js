document.addEventListener('DOMContentLoaded', () => {
    const addPromptButton = document.getElementById('add-prompt');
    const generateButton = document.getElementById('generate-images');
    const promptContainer = document.getElementById('prompt-container');
    const imageContainer = document.getElementById('image-container');
    const loadingIndicator = document.getElementById('loading');

    // Garantir que o indicador de carregamento esteja oculto por padrão
    console.log("Ocultando indicador de carregamento por padrão");
    loadingIndicator.classList.add('hidden');

    let promptCount = 1; // Contador para os campos de prompt

    addPromptButton.addEventListener('click', () => {
        const newPromptInput = document.createElement('div');
        newPromptInput.className = 'prompt-input';
        newPromptInput.innerHTML = `
        <div class="prompt-label">Prompt ${promptCount + 1}</div>
        <input type="text" placeholder="Digite seu prompt aqui..." class="prompt-field">
        <span class="remove-prompt">✖</span>
    `;
        promptContainer.appendChild(newPromptInput);

        // Atualiza o contador
        promptCount++;

        // Adiciona o evento de clique para remover o prompt
        newPromptInput.querySelector('.remove-prompt').addEventListener('click', () => {
            newPromptInput.remove();
            promptCount--; // Atualiza o contador ao remover um prompt
           
            // Atualiza os números dos prompts restantes
            document.querySelectorAll('.prompt-label').forEach((label, index) => {
                label.textContent = `Prompt ${index + 1}`;
            });
        });
    });

    generateButton.addEventListener('click', async () => {
        console.log("Botão de gerar imagens clicado");

        const prompts = Array.from(document.querySelectorAll('.prompt-field'))
            .map(input => input.value)
            .filter(prompt => prompt.trim() !== '');

        if (prompts.length === 0) {
            alert('Por favor, insira pelo menos um prompt válido.');
            return;
        }

        // Mostrar o indicador de carregamento
        console.log("Mostrando indicador de carregamento");
        loadingIndicator.classList.remove('hidden');
        imageContainer.innerHTML = '';

        try {
            const response = await fetch('/generate_images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompts }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            displayImages(data.images);
        } catch (error) {
            console.error('Error:', error);
            alert('Ocorreu um erro ao gerar as imagens. Por favor, tente novamente.');
        } finally {
            // Esconder o indicador de carregamento após a finalização
            console.log("Escondendo indicador de carregamento");
            loadingIndicator.classList.add('hidden');
        }
    });

    function displayImages(images) {
        images.forEach((image, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'image-wrapper';
            wrapper.innerHTML = `
                <img src="${image.path}" alt="Generated Image ${index + 1}">

              <p class="prompt-text">Prompt: ${image.prompt}</p>

                <a href="${image.path}" download="cena${(index + 1).toString().padStart(2, '0')}.png" class="download-button">Baixar Imagem</a>
            `;
            imageContainer.appendChild(wrapper);

            const img = wrapper.querySelector('img');
            img.addEventListener('click', () => {
                const fullScreenWrapper = document.createElement('div');
                fullScreenWrapper.className = 'full-screen-wrapper';
                fullScreenWrapper.innerHTML = `
                    <img src="${image.path}" class="full-screen-image">
                    <span class="close-button">&times;</span>
                `;
                document.body.appendChild(fullScreenWrapper);

                fullScreenWrapper.querySelector('.close-button').addEventListener('click', () => {
                    document.body.removeChild(fullScreenWrapper);
                });
            });
        });
    }
});
