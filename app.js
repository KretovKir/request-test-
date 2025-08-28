
const requestBodyEl = document.getElementById('requestBody');
const sendRequestBtn = document.getElementById('sendRequest');
const resultEl = document.getElementById('result');

// Отправка запроса
sendRequestBtn.addEventListener('click', async () => {
    // Очистка предыдущего результата
    resultEl.innerHTML = '';
    
    let body;
    try {
        body = JSON.parse(requestBodyEl.value);

    } catch (e) {
        console.log(e)
        resultEl.innerHTML = `
            <div class="result error">
                <div>Error: Неверный JSON формат</div>
            </div> 
            <div class='error-message'>
              ${e.message}
            </div>`;
        
        return;
    }
    
    // Состояние загрузки
    resultEl.innerHTML = `
        <div class="result loading">
            Отправка запроса, ждите (макс. 30 сек.)
        </div>
    `;
    
    sendRequestBtn.disabled = true;
    sendRequestBtn.textContent = 'Запрос обрабатывается...';
    
    const result = await window.fetchData(body);
    console.log(result)
    // Вывод результата
    if (result.result === 'success') {
        resultEl.innerHTML = `
            <div class="result success">
                <div>Запрос отправлен успешно</div>
                <div class="json-output">${JSON.stringify(result.data, null, 2)}</div>
                <div class="status">Статус: Успешно </div>
            </div>
        `;
    } else {
        resultEl.innerHTML = `
            <div class="result error">
                <div>Error: ${result.message}</div>
                <div class="status">Статус: Ошибка </div>
            </div>
        `;
    }
    
    sendRequestBtn.disabled = false;
    sendRequestBtn.textContent = 'Отправить запрос';
});