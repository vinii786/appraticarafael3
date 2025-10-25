import { useState, useEffect } from 'react';
import './App.css';

// Coloque a URL do seu backend
const BASE_URL = 'https://verbose-fiesta-wqq4gv7p4wq396j6-8080.app.github.dev/api/pessoas';

function App() {
  const [pessoas, setPessoas] = useState([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [idBusca, setIdBusca] = useState('');
  const [pessoaBuscada, setPessoaBuscada] = useState(null);

  // Listar todas as pessoas
  const fetchPessoas = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setPessoas(data);
    } catch (error) {
      console.error('Erro ao buscar pessoas:', error);
    }
  };

  useEffect(() => {
    fetchPessoas();
  }, []);

  // Buscar pessoa por ID
  const handleBuscarPorId = async () => {
    if (!idBusca) return;
    try {
      const response = await fetch(`${BASE_URL}/${idBusca}`);
      if (response.ok) {
        const data = await response.json();
        setPessoaBuscada(data);
      } else {
        setPessoaBuscada(null);
        alert('Pessoa não encontrada');
      }
    } catch (error) {
      console.error('Erro ao buscar pessoa por ID:', error);
    }
  };

  // Inserir nova pessoa
  const handleCadastrar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, idade: parseInt(idade, 10) }),
      });
      if (response.ok) {
        setNome('');
        setIdade('');
        fetchPessoas();
      } else {
        console.error('Erro ao cadastrar pessoa');
      }
    } catch (error) {
      console.error('Erro na requisição POST:', error);
    }
  };

  // Atualizar pessoa
  const handleAtualizar = async (id, novoNome, novaIdade) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novoNome, idade: parseInt(novaIdade, 10) }),
      });
      if (response.ok) fetchPessoas();
    } catch (error) {
      console.error('Erro ao atualizar pessoa:', error);
    }
  };

  // Deletar pessoa
  const handleDeletar = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) fetchPessoas();
    } catch (error) {
      console.error('Erro ao deletar pessoa:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CRUD Pessoas - React</h1>
      </header>

      <main>
        <section>
          <h2>Cadastrar Nova Pessoa</h2>
          <form onSubmit={handleCadastrar}>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Idade"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              required
            />
            <button type="submit">Cadastrar</button>
          </form>
        </section>

        <hr />

        <section>
          <h2>Buscar Pessoa por ID</h2>
          <input
            type="number"
            placeholder="ID"
            value={idBusca}
            onChange={(e) => setIdBusca(e.target.value)}
          />
          <button onClick={handleBuscarPorId}>Buscar</button>
          {pessoaBuscada && (
            <div>
              <p>ID: {pessoaBuscada.id}</p>
              <p>Nome: {pessoaBuscada.nome}</p>
              <p>Idade: {pessoaBuscada.idade}</p>
            </div>
          )}
        </section>

        <hr />

        <section>
          <h2>Pessoas Cadastradas</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Idade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nome}</td>
                  <td>{p.idade}</td>
                  <td>
                    <button onClick={() => handleDeletar(p.id)}>Deletar</button>
                    <button
                      onClick={() => {
                        const novoNome = prompt('Novo nome:', p.nome);
                        const novaIdade = prompt('Nova idade:', p.idade);
                        if (novoNome && novaIdade) handleAtualizar(p.id, novoNome, novaIdade);
                      }}
                    >
                      Editar
                    </button>
                  </td>
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
