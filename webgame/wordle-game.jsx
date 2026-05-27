import { useState, useEffect, useCallback } from "react";

const WORDS = [
  "APPLE","BRAVE","CRANE","DRIVE","EAGLE","FLAME","GRACE","HOUSE","IVORY","JOKER",
  "KNEEL","LIGHT","MOUNT","NIGHT","OCEAN","PIANO","QUEEN","RIVER","STONE","TABLE",
  "ULTRA","VIDEO","WATER","XENON","YACHT","ZEBRA","BLAZE","CHESS","DEBUT","ELITE",
  "FROST","GLOBE","HEART","INBOX","JEWEL","KNIFE","LASER","MAGIC","NERVE","ORBIT",
  "PEARL","QUEST","RADAR","SMILE","TIGER","UNCLE","VAULT","WITCH","EXTRA","YIELD",
  "BLOOD","CANDY","DEATH","EARTH","FETCH","GIANT","HONOR","INDEX","JUICE","KIOSK",
  "LANCE","MEANS","NORTH","OPERA","PAUSE","QUIRK","RANCH","SLAVE","TOWER","URBAN",
  "VENUS","WASTE","BOXER","CRISP","DELTA","ENVY","FLORA","GRIND","HASTE","IMAGE",
];

const KEYBOARD_ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","⌫"],
];

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

function getTileState(guess, index, secret) {
  const letter = guess[index];
  if (!letter) return "empty";
  if (secret[index] === letter) return "correct";
  if (secret.includes(letter)) return "present";
  return "absent";
}

function getTileStates(guess, secret) {
  return Array.from({ length: WORD_LENGTH }, (_, i) => getTileState(guess, i, secret));
}

function getKeyState(letter, guesses, secret) {
  let best = null;
  for (const guess of guesses) {
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] !== letter) continue;
      const state = getTileState(guess, i, secret);
      if (state === "correct") return "correct";
      if (state === "present") best = "present";
      else if (!best) best = "absent";
    }
  }
  return best;
}

const TILE_COLORS = {
  empty: { bg: "transparent", border: "#565758", color: "#fff" },
  tbd: { bg: "transparent", border: "#999", color: "#fff" },
  correct: { bg: "#538d4e", border: "#538d4e", color: "#fff" },
  present: { bg: "#b59f3b", border: "#b59f3b", color: "#fff" },
  absent: { bg: "#3a3a3c", border: "#3a3a3c", color: "#fff" },
};

const KEY_COLORS = {
  null: { bg: "#818384", color: "#fff" },
  correct: { bg: "#538d4e", color: "#fff" },
  present: { bg: "#b59f3b", color: "#fff" },
  absent: { bg: "#3a3a3c", color: "#fff" },
};

export default function WordleGame() {
  const [secret] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [guesses, setGuesses] = useState([]);
  const [current, setCurrent] = useState("");
  const [shake, setShake] = useState(false);
  const [message, setMessage] = useState("");
  const [reveal, setReveal] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const showMessage = (msg, duration = 1800) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), duration);
  };

  const submitGuess = useCallback(() => {
    if (current.length < WORD_LENGTH) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      showMessage("Palavra muito curta!");
      return;
    }
    const newGuesses = [...guesses, current];
    setReveal(guesses.length);
    setTimeout(() => {
      setGuesses(newGuesses);
      setCurrent("");
      setReveal(null);
      if (current === secret) {
        const msgs = ["Incrível! 🎉", "Excelente! ✨", "Muito bom! 🔥", "Ótimo! 👏"];
        showMessage(msgs[Math.min(newGuesses.length - 1, msgs.length - 1)], 3000);
        setGameOver(true);
      } else if (newGuesses.length >= MAX_GUESSES) {
        showMessage(`Era: ${secret}`, 4000);
        setGameOver(true);
      }
    }, WORD_LENGTH * 350 + 200);
  }, [current, guesses, secret]);

  const handleKey = useCallback((key) => {
    if (gameOver || reveal !== null) return;
    if (key === "ENTER") { submitGuess(); return; }
    if (key === "⌫" || key === "BACKSPACE") { setCurrent(p => p.slice(0, -1)); return; }
    if (/^[A-Z]$/.test(key) && current.length < WORD_LENGTH) {
      setCurrent(p => p + key);
    }
  }, [gameOver, reveal, current, submitGuess]);

  useEffect(() => {
    const handler = (e) => handleKey(e.key.toUpperCase());
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleKey]);

  const rows = [...guesses, current, ...Array(MAX_GUESSES - guesses.length - 1).fill("")].slice(0, MAX_GUESSES);

  return (
    <div style={{ minHeight: "100vh", background: "#121213", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'Clear Sans', Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ width: "100%", maxWidth: 500, borderBottom: "1px solid #3a3a3c", padding: "12px 0", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, letterSpacing: 4, margin: 0 }}>WORDLE</h1>
      </div>

      {/* Message toast */}
      <div style={{
        position: "fixed", top: 80, left: "50%", transform: `translateX(-50%) translateY(${message ? 0 : -20}px)`,
        background: "#fff", color: "#121213", padding: "10px 20px", borderRadius: 6,
        fontWeight: 700, fontSize: 14, opacity: message ? 1 : 0,
        transition: "opacity 0.2s, transform 0.2s", zIndex: 100, pointerEvents: "none",
      }}>
        {message}
      </div>

      {/* Board */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {rows.map((guess, rowIdx) => {
            const isCurrentRow = rowIdx === guesses.length;
            const isRevealing = reveal === rowIdx;
            const isSubmitted = rowIdx < guesses.length;

            return (
              <div
                key={rowIdx}
                style={{
                  display: "flex", gap: 5,
                  animation: isCurrentRow && shake ? "shake 0.6s ease" : "none",
                }}
              >
                {Array.from({ length: WORD_LENGTH }, (_, colIdx) => {
                  const letter = guess[colIdx] || "";
                  let state = "empty";
                  if (isSubmitted) state = getTileStates(guess, secret)[colIdx];
                  else if (letter) state = "tbd";

                  const colors = TILE_COLORS[state];
                  const delay = isRevealing ? colIdx * 350 : 0;

                  return (
                    <div
                      key={colIdx}
                      style={{
                        width: 62, height: 62,
                        border: `2px solid ${colors.border}`,
                        background: colors.bg,
                        color: colors.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 32, fontWeight: 700,
                        transition: isRevealing ? `background ${0.3}s ${delay}ms, border-color ${0.3}s ${delay}ms` : "border-color 0.1s",
                        animation: letter && !isSubmitted && !isRevealing ? "pop 0.1s ease" : "none",
                        transform: isRevealing ? `rotateX(0deg)` : "none",
                      }}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyboard */}
      <div style={{ width: "100%", maxWidth: 500, padding: "0 8px 20px" }}>
        {KEYBOARD_ROWS.map((row, rIdx) => (
          <div key={rIdx} style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 6 }}>
            {row.map((key) => {
              const state = key.length === 1 ? getKeyState(key, guesses, secret) : null;
              const colors = KEY_COLORS[state];
              const isWide = key === "ENTER" || key === "⌫";
              return (
                <button
                  key={key}
                  onClick={() => handleKey(key)}
                  style={{
                    width: isWide ? 65 : 43, height: 58,
                    background: colors.bg, color: colors.color,
                    border: "none", borderRadius: 4,
                    fontSize: isWide ? 12 : 18, fontWeight: 700,
                    cursor: "pointer",
                    transition: "background 0.3s",
                    userSelect: "none",
                  }}
                >
                  {key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {gameOver && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
          <div style={{ background: "#1a1a1b", border: "1px solid #3a3a3c", borderRadius: 12, padding: 32, textAlign: "center", color: "#fff" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>{guesses[guesses.length - 1] === secret ? "🎉" : "😔"}</div>
            <div style={{ fontSize: 14, color: "#818384", marginBottom: 4 }}>A palavra era</div>
            <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: 4, marginBottom: 24 }}>{secret}</div>
            <button
              onClick={() => window.location.reload()}
              style={{ background: "#538d4e", color: "#fff", border: "none", borderRadius: 6, padding: "12px 28px", fontSize: 16, fontWeight: 700, cursor: "pointer" }}
            >
              Jogar novamente
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.12); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
