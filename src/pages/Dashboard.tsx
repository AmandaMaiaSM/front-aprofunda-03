
import { useEffect, useState, useRef} from "react";
import axios from "axios";
import * as S from "./styles";
import ChatGemini from "../components/chat-gemini/ChatGemini";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import http from "../http";

type Despesa = {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  tipo: string;
  data: string;
  user: string;
};

const Dashboard = () => {
  const [despesas, setDespesas] = useState([] as Despesa[]);
  //nova edição 
   // Estado para controlar qual menu está aberto
  const [menusAbertos, setMenusAbertos] = useState<Record<number, boolean>>({}); 
  const menuRef = useRef<HTMLDivElement | null>(null); // Referência para o menu
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Referência para o botão de menu
  // Alteração aqui

  //fim de ed
  const [user] = useAuthState(auth); // Hook do Firebase pa

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
  }, []);

  //novas ediçaoes 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (

        menuRef.current && !menuRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)
      ) {
        // Fecha todos os menus
        setMenusAbertos({}); 
        console.log("fora");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const handleExcluir = async (id: number) => {
    try {
      await http.delete(`/despesas/${id}`);
      setDespesas(despesas.filter((despesa) => despesa.id !== id));
    } catch (error) {
      console.error("Erro ao excluir despesa:", error);
    }
  };

  const handleEditar = (id: number) => {
    console.log(`Editar despesa com ID: ${id}`);
    // Implemente a lógica para edição, como abrir um modal ou redirecionar para outra página.
  };

  const handleArquivar = (id: number) => {
    console.log(`Arquivar despesa com ID: ${id}`);
    // Marcar despesa como arquivada. Implemente a lógica conforme a necessidade.
  };
  
  const toggleMenu = (id: number) => {
    setMenusAbertos((prev) => ({
      ...prev,
      [id]: !(prev[id] ?? false), // Alterna entre aberto e fechado
    }));
  };

  // fim ed

  const calcularTotais = () => {
    if (despesas.length === 0) {
      return { entradas: 0, saidas: 0, saldo: 0 };
    }

    const entradas = despesas
      .filter((d) => d.tipo === "entrada" && d.valor)
      .reduce((acc, d) => acc + d.valor, 0);

    const saidas = despesas
      .filter((d) => d.tipo === "saída" && d.valor)
      .reduce((acc, d) => acc + d.valor, 0);

    return { entradas, saidas, saldo: entradas - saidas };
  };

  const { entradas, saidas, saldo } = calcularTotais();

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
          </tr>
        </thead>
        <tbody>
          {despesas.map((despesa) => (
            <tr key={despesa.id}>
              <td>{despesa.descricao}</td>
              <td>{despesa.categoria}</td>
              <td>R$ {despesa.valor.toFixed(2)}</td>
              <td>{despesa.tipo}</td>
              <td>{despesa.data}</td>

              {/* novas ediçaoes*/}    
                      
              <td>
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => toggleMenu(despesa.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1.5rem",
                    }}
                  >
                    &#8942; {/* Ícone de três pontos */}
                  </button>
                  
                  {menusAbertos[despesa.id] && (
                     <div
                     style={{
                      position: "absolute",
                      top: "100%",  
                      right: 0,
                      background: "#fff",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      borderRadius: "4px",
                      zIndex: 100,
                      maxHeight: "200px",  
                      overflowY: "auto",   
                      width: "200px",  
                     }}
                   >
                     <button
                       onClick={() => handleEditar(despesa.id)}
                       style={{
                         display: "block",
                         padding: "10px 20px",
                         background: "none",
                         border: "none",
                         textAlign: "left",
                         cursor: "pointer",
                         color: "#333",
                       }}
                     >
                       Editar
                     </button>
                     <button
                       onClick={() => handleExcluir(despesa.id)}
                       style={{
                         display: "block",
                         padding: "10px 20px",
                         background: "none",
                         border: "none",
                         textAlign: "left",
                         cursor: "pointer",
                         color: "#333",
                       }}
                     >
                       Excluir
                     </button>
                     <button
                       onClick={() => handleArquivar(despesa.id)}
                       style={{
                         display: "block",
                         padding: "10px 20px",
                         background: "none",
                         border: "none",
                         textAlign: "left",
                         cursor: "pointer",
                         color: "#333",
                       }}
                        >
                        Arquivar
                      </button>
                    </div>
                  )}
                </div>
              </td>
              {/* nfim ed*/}  

            </tr>
          ))}
        </tbody>
      </S.StyledTable>
      <ChatGemini despesas={despesas} />
    </S.TableContainer>
  );
};

export default Dashboard;
