// Evento de submissão do formulário
document.getElementById('employee-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Obter os valores do formulário
  const name = document.getElementById('employee-name').value;
  const email = document.getElementById('employee-email').value;
  const role = document.getElementById('employee-role').value;
  const salary = parseFloat(document.getElementById('employee-salary').value);

  // Validar os dados
  if (!name || !email || !role || isNaN(salary)) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
  }

  // Criar objeto de funcionário
  const employee = {
      name,
      email,
      role,
      salary
  };

  // Obter a lista de funcionários do armazenamento local
  const employees = JSON.parse(localStorage.getItem('employees')) || [];

  // Adicionar o novo funcionário à lista
  employees.push(employee);

  // Salvar a lista atualizada no armazenamento local
  localStorage.setItem('employees', JSON.stringify(employees));

  // Limpar o formulário
  document.getElementById('employee-form').reset();

  // Atualizar a tabela/lista de funcionários
  updateEmployeeList(employees);

  // Calcular o salário total e contar gerentes
  const totalSalary = employees.reduce((total, emp) => total + emp.salary, 0);
  const managerCount = employees.filter(emp => emp.role === 'gerente').length;

  // Exibir informações
  document.getElementById('total-salary').textContent = totalSalary.toFixed(2);
  document.getElementById('manager-count').textContent = managerCount;
});

// Função para atualizar a tabela/lista de funcionários
function updateEmployeeList(employees) {
  const listElement = document.getElementById('employee-list');
  listElement.innerHTML = '';

  employees.forEach(emp => {
      const listItem = document.createElement('li');
      listItem.textContent = `${emp.name} (${emp.role}) - Salário: R$ ${emp.salary.toFixed(2)}`;
      listElement.appendChild(listItem);
  });
}

// Carregar os dados do armazenamento local ao carregar a página
window.addEventListener('load', function() {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  updateEmployeeList(employees);
});