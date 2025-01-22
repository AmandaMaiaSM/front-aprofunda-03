import { useEffect, useState } from "react";
import * as S from "./styles";
import ChatGemini from "../components/chat-gemini/ChatGemini";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import http from "../http";

type Despesa = {
  id: string;
  descricao: string;
  categoria: string;
  valor: number;
  tipo: string;
  data: string;
  user: string;
  arquivado: boolean;
};

const Dashboard = () => {
  const [despesas, setDespesas] = useState([] as Despesa[]);
  const [user] = useAuthState(auth);

  // Busca as despesas do usuário
  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const response = await http.get(`/despesas/${user?.uid}`);
        setDespesas(response.data);
      } catch (error) {
        console.error("Erro ao buscar despesas:", error);
      }
    };
    fetchDespesas();
  }, [user]);

  // Calcula os totais de entradas, saídas e saldo sempre que "despesas" mudar
  const calcularTotais = () => {

    const despesas_desarquivadas = despesas.filter((d) => {
      return d.arquivado === false
    })
    if (despesas_desarquivadas.length === 0) {
      return { entradas: 0, saidas: 0, saldo: 0 };
    }

    const entradas = despesas_desarquivadas
      .filter((d) => d.tipo === "entrada" && d.valor)
      .reduce((acc, d) => acc + d.valor, 0);

    const saidas = despesas_desarquivadas
      .filter((d) => d.tipo === "saída" && d.valor)
      .reduce((acc, d) => acc + d.valor, 0);

    return { entradas, saidas, saldo: entradas - saidas };
  };

  const { entradas, saidas, saldo } = calcularTotais();

  // Função para arquivar despesa
  const arquivarFinanca = async (id: string) => {
    try {
      await http.patch(`/despesas/arquivar/${id}`);
      setDespesas((prev) =>
        prev.map((despesa) =>
          despesa.id === id ? { ...despesa, arquivado: true } : despesa
        )
      );
    } catch (error) {
      console.error("Erro ao arquivar despesa:", error);
    }
  };

  return (
    <S.TableContainer>
      <S.Title>Dashboard de Finanças</S.Title>

      {/* Totais de Entradas, Saídas e Saldo */}
      <S.CardsContainer>
        <S.Card bgColor="#FF8C00">
          <p>Entradas</p>
          <p>R$ {entradas.toFixed(2)}</p>
        </S.Card>
        <S.Card bgColor="#B22222">
          <p>Saídas</p>
          <p>R$ {saidas.toFixed(2)}</p>
        </S.Card>
        <S.Card bgColor="#006400">
          <p>Saldo</p>
          <p>R$ {saldo.toFixed(2)}</p>
        </S.Card>
      </S.CardsContainer>

      {/* Tabela com os dados das despesas */}
      <S.StyledTable>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {despesas.map((despesa) => {
            if (!despesa.arquivado) {
              return (
                <tr key={despesa.id}>
                  <td>{despesa.descricao}</td>
                  <td>{despesa.categoria}</td>
                  <td>R$ {despesa.valor.toFixed(2)}</td>
                  <td>{despesa.tipo}</td>
                  <td>{despesa.data}</td>
                  <td>
                    {/* Botão de arquivar */}
                    <button onClick={() => arquivarFinanca(despesa.id)}>Arquivar</button>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </S.StyledTable>
      <ChatGemini despesas={despesas} />
    </S.TableContainer>
  );
};

export default Dashboard;
