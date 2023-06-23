document.addEventListener('DOMContentLoaded', function(event) {
    // Função para inicializar o tooltip
    function initTooltip() {
        var elems = document.querySelectorAll('.tooltipped');
        var options = {};
        var instances = M.Tooltip.init(elems, options);
    }
    
    // Fechar alert
    function saveForm() {
        form.submit();
    }

    // Função para salvar e continuar
    function saveContinue() {
        inputEditContinue.value = 'register';
        saveForm();
    }
    
    // Função para salvar e listar
    function saveList() {
        inputEditContinue.value = 'list';
        saveForm();
    }

    // Pesquisa conta
    function pesqAccount(event) {
        console.log(event);
    }
    
    // Obtenção dos elementos
    const inputEditContinue = document.getElementById('IdEditContinue');
    const buttonSaveContinue = document.getElementById('IdbtnGravarContinuar');
    const buttonSaveList = document.getElementById('IdbtnGravarListar');
    const form = document.getElementById('form');
    const alertMsg = document.getElementById('idAlertMsg');
    const inputPesq = document.getElementById('IdPesqAccount');

    // Adicionar eventos aos botões
    if (buttonSaveContinue && buttonSaveList) { 
        buttonSaveContinue.addEventListener('click', saveContinue);
        buttonSaveList.addEventListener('click', saveList);
    }

    // Adiciona evento aos inputs
    if (inputPesq) {
        inputPesq.addEventListener('keydown', function(event) {
            pesqAccount(event);
        });
    }
    
    // Chamar função de inicialização do tooltip
    initTooltip();
    
    // Fechar elemento lentamente
    if (alertMsg) {
        setTimeout(function() {
            alertMsg.style.opacity = '0';
            alertMsg.style.transition = 'opacity 1s ease';
            
            setTimeout(function() {
                alertMsg.remove();
            }, 1000);
        }, 3000);
    }

});
