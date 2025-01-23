import * as S from "./styles";

const Home = () => {
  return (
    <S.Container>
      <S.ImageContainer />
      <S.Title style={{ fontSize: "3rem", fontFamily: "Georgia, serif", marginBottom: "2rem" }}>
        Transforme sua relação com o dinheiro
      </S.Title>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          fontFamily: "Times New Roman, serif",
          lineHeight: "1.8"
        }}
      >
        <S.Subtitle style={{ textAlign: "justify" }}>
          Na <strong>Gemini</strong>, ajudamos você a navegar pelas suas finanças com clareza e controle. Nosso objetivo é oferecer a você uma visão clara do seu dinheiro e das suas possibilidades.
        </S.Subtitle>
        <S.Subtitle style={{ textAlign: "justify" }}>
          Tome decisões inteligentes, planeje seu futuro com confiança e atinja seus objetivos financeiros com tranquilidade. Nosso compromisso é tornar sua experiência simples e eficiente.
        </S.Subtitle>
        <S.Subtitle style={{ textAlign: "justify" }}>
          Junte-se a nós e comece sua jornada rumo a uma vida financeira mais equilibrada e próspera. Estamos aqui para guiá-lo em cada passo do caminho.
        </S.Subtitle>
        <S.Subtitle style={{ textAlign: "justify" }}>
          Com a <strong>Gemini</strong>, você não apenas organiza suas finanças, mas também transforma sua visão de futuro. Venha fazer parte dessa mudança!
        </S.Subtitle>
      </div>
    </S.Container>
  );
};

export default Home;
