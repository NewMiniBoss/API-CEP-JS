(() => {
    const mensagemErro = document.querySelector('[data-erro]');

    async function buscaEndereco(cep) {
        try {
            const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const consultaCEPConvertida = await consultaCEP.json();
            if (consultaCEPConvertida.erro) {
                throw Error(`O CEP não existe!`)
            } else {
                console.log(consultaCEPConvertida);
            }
            const endereco = document.querySelector('#endereco');
            const bairro = document.querySelector('#bairro');
            const cidade = document.querySelector('#cidade');
            endereco.value = consultaCEPConvertida.logradouro;
            bairro.value = consultaCEPConvertida.bairro;
            cidade.value = consultaCEPConvertida.localidade;
            mensagemErro.innerHTML = ``;

            return consultaCEPConvertida;
        } catch (erro) {
            mensagemErro.innerHTML = `<p class="erro">CEP: ${cep} inválido.</p>`;
            console.log(erro);
        }
    }

    const cep = document.querySelector('#cep');
    cep.addEventListener('focusout', () => buscaEndereco(cep.value))
})();