import { useEffect, useState } from "react";
import * as S from "./styles";
import ChatGemini from "../components/chat-gemini/ChatGemini";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import http from "../http";

import img_arquivar from '../assets/arquivar.png'
import img_lixo from '../assets/bin.png'

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
  const [entradas, setEntradas] = useState(0.0);
  const [saidas, setSaidas] = useState(0.0);
  const [saldo, setSaldo] = useState(0.0);
  const [user] = useAuthState(auth);

  // Busca as despesas do usuário
  useEffect(() => {
    const fetchDespesas = async () => {
      try {
        const response = await http.get(`/despesas/${user?.uid}`);

      
        const despesasDesarquivadas = response.data.filter((d: Despesa) => {
          return d.arquivado === false
        }) 

        setDespesas(despesasDesarquivadas);
      } catch (error) {
        console.error("Erro ao buscar despesas:", error);
      }
    };
    fetchDespesas();
  }, [user]);

  // Calcula os totais de entradas, saídas e saldo sempre que "despesas" mudar
  useEffect(() =>{
    console.log(despesas)
    
    if (despesas.length == 0) {
      setEntradas(0.0)
      setSaidas(0.0)
      setSaldo(0.0)
    } else {
      setEntradas(despesas
        .filter((d) => d.tipo === "entrada" && d.valor)
        .reduce((acc, d) => acc + d.valor, 0)
      )
  
      setSaidas(despesas
        .filter((d) => d.tipo === "saída" && d.valor)
        .reduce((acc, d) => acc + d.valor, 0)
      )
  
      setSaldo(entradas - saidas)
    }
  }, [despesas]);

  

  // Função para arquivar despesa
  const arquivarFinanca = async (id: string) => {
    try {
      await http.patch(`/despesas/arquivar/${id}`);
      setDespesas((prev) => prev.filter((despesa) => {
        return despesa.id !== id
      }));
    } catch (error) {
      console.error("Erro ao arquivar despesa:", error);
    }
  };

  const deletarFinanca = async (id: string) => {
    const confirmacao = window.confirm("Você tem certeza que deseja deletar essa despesa?");
    
    if(confirmacao === true){
      try {
        await http.delete(`/despesas/${id}`);
        setDespesas((prev) => prev.filter((despesa) => {
          return despesa.id !== id
        }));
      
      } catch (error) {
        console.error("Erro ao deletar despesa:", error);
      }

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
              return (
                <tr key={despesa.id}>
                  <td>{despesa.descricao}</td>
                  <td>{despesa.categoria}</td>
                  <td>R$ {despesa.valor.toFixed(2)}</td>
                  <td>{despesa.tipo}</td>
                  <td>{despesa.data}</td>
                  <td style={{display: "flex", gap:"5px"}}>
                    {/* Botão de arquivar */}
                    <S.ButtonArquivar title="Arquivar" onClick={() => arquivarFinanca(despesa.id)}>
                      <img width='20px' src={img_arquivar} alt="Arquivar"/>
                    </S.ButtonArquivar>
                    {/* Botão de arquivar */}
                    <S.ButtonArquivar title="Deletar" onClick={() => deletarFinanca(despesa.id)}>
                      <img width='20px' src={img_lixo} alt="Deletar"/>
                    </S.ButtonArquivar>
                  </td>
                </tr>
              );
          })}
        </tbody>
      </S.StyledTable>
      <ChatGemini despesas={despesas} />
    </S.TableContainer>
  );
};

export default Dashboard;
