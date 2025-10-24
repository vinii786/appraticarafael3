import { useState, useEffect } from 'react';
import './App.css'; // O Vite já cria este ficheiro, pode personalizá-lo

// COLOQUE A URL DA SUA API AQUI
const API_URL = 'https://verbose-fiesta-wqv4gv7p4wq396j6-8080.app.github.dev/api/pessoas';

function App() {
  // Estado para a lista de pessoas
  const [pessoas, setPessoas] = useState([]);

  // Estado para os campos do formulário
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  // Função para carregar as pessoas da API (GET)
  const fetchPessoas = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPessoas(data);
    } catch (error) {
      console.error('Erro ao buscar pessoas:', error);
    }
  };

  // Carrega a lista quando o componente é montado
  useEffect(() => {
    fetchPessoas();
  }, []);

  // Função para submeter o formulário (POST)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    const novaPessoa = {
      nome: nome,
      idade: parseInt(idade, 10) // Converte a idade para número
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaPessoa),
      });

      if (response.ok) {
        // Limpa o formulário
        setNome('');
        setIdade('');
        // Recarrega a lista para mostrar a nova pessoa
        fetchPessoas(); 
      } else {
        console.error('Erro ao cadastrar pessoa');
      }
    } catch (error) {
      console.error('Erro na requisição POST:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cliente React - Pessoas</h1>
      </header>

      <main>
        {/* Formulário de Cadastro */}
        <section>
          <h2>Cadastrar Nova Pessoa</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nome: </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Idade: </label>
              <input
                type="number"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                required
              />
            </div>
            <button type="submit">Salvar</button>
          </form>
        </section>

        <hr />

        {/* Lista de Pessoas */}
        <section>
          <h2>Pessoas Cadastradas</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Idade</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((pessoa) => (
                <tr key={pessoa.id}>
                  <td>{pessoa.id}</td>
                  <td>{pessoa.nome}</td>
                  <td>{pessoa.idade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;