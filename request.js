async function fetchData(body) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
      // Симуляция запроса для url1
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockId = '1';
      
      // Опрос url2 до готовности
      let attempts = 0;
      const maxAttempts = 15; // Ожидание 
      
      while (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // симуляция рандомного ответа url2
          const isReady = Math.random() > 0.3;
          
          if (isReady) {
              clearTimeout(timeoutId);
              return {
                  result: "success",
                  data: {
                      id: mockId,
                      processedData: body,
                      timestamp: new Date().toISOString(),
                      status: "completed",
                      details: "success",
                      sendler: 'Kretov Kirill'
                  }
              };
          }
          
          attempts++;
      }
      
      // При привышении времени ожидания
      throw new Error('Ошибка запроса: превышено время ожидания');
      
  } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
          return {
              result: "error",
              message: 'Ошибка запроса: превышено время ожидания'
          };
      }
      
      return {
          result: "error",
          message: error.message || 'Неизвестная ошибка'
      };
  }
}

window.fetchData = fetchData;