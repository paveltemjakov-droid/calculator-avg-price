let purchases = [];

function addPurchase() {
  const price = parseFloat(document.getElementById('price').value);
  const amount = parseFloat(document.getElementById('amount').value);

  if (isNaN(price) || isNaN(amount) || price <= 0 || amount <= 0) {
    alert("Введите корректные положительные числа");
    return;
  }

  const qty = amount / price;
  purchases.push({ price, amount, qty });

  document.getElementById('price').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('price').focus();

  updatePurchasesList();
}

function updatePurchasesList() {
  const listEl = document.getElementById('purchases-list');
  if (purchases.length === 0) {
    listEl.style.display = 'none';
    return;
  }

  let html = '<h3>Добавлено покупок:</h3><ul>';
  purchases.forEach((p, i) => {
    html += `<li>#${
      i + 1
    }: цена ${p.price.toFixed(2)}$, сумма ${
      p.amount.toFixed(2)
    }$, кол-во ${p.qty.toFixed(6)}</li>`;
  });
  html += '</ul>';
  listEl.innerHTML = html;
  listEl.style.display = 'block';
}

function calculate() {
  if (purchases.length === 0) {
    alert("Сначала добавьте хотя бы одну покупку");
    return;
  }

  const totalMoney = purchases.reduce((sum, p) => sum + p.amount, 0);
  const totalQty = purchases.reduce((sum, p) => sum + p.qty, 0);
  const avgPrice = totalMoney / totalQty;

  const resultText = `РЕЗУЛЬТАТ РАСЧЕТА:

Количество покупок: ${purchases.length}
Общая сумма: $${totalMoney.toFixed(2)}
Общее количество: ${totalQty.toFixed(6)}
СРЕДНЯЯ ЦЕНА ВХОДА: $${avgPrice.toFixed(2)}`;

  const resultEl = document.getElementById('result');
  resultEl.textContent = resultText;
  resultEl.style.display = 'block';
}

function clearAll() {
  purchases = [];
  document.getElementById('price').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('purchases-list').style.display = 'none';
  document.getElementById('result').style.display = 'none';
  document.getElementById('price').focus();
}
