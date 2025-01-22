import React from 'react'
import { useEffect, useState, useRef} from "react";
import axios from "axios";
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

  export default function Arquivado() {
    const [despesas, setDespesas] = useState([] as Despesa[]);
    const [user] = useAuthState(auth);
  
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
  
    // Função para arquivar/desarquivar despesa
    const desarquivarFinanca = async (id:string)=> {
      try {
        const response = await http.patch(`/despesas/desarquivar/${id}`);
        // Atualiza a lista de despesas após arquivar
        setDespesas((prev) => prev.map((despesa) => {
          if (despesa.id === id) {
            return { ...despesa, arquivado: false }; // Atualiza o status localmente
          }
          return despesa;
        }));
      } catch (error) {
        console.error("Erro ao desarquivar despesa:", error);
      }
    };
  
    return (
      <S.TableContainer>
        <S.Title>Finanças Arquivadas</S.Title>
  
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
              if (despesa.arquivado === true) {
                return (
                  <tr key={despesa.id}>
                    <td>{despesa.descricao}</td>
                    <td>{despesa.categoria}</td>
                    <td>R$ {despesa.valor.toFixed(2)}</td>
                    <td>{despesa.tipo}</td>
                    <td>{despesa.data}</td>
                    <td>
                      {/* Botão de arquivar */}
                      <button onClick={() => desarquivarFinanca(despesa.id)}>
                        Desarquivar
                      </button>
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
  }
  