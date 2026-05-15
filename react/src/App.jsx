import { useCallback, useMemo, useState } from "react";
import { questions } from "./data/questions.js";

function answerButtonClass({ locked, isSelected, isCorrectAnswer }) {
  const parts = [
    "w-full text-left rounded-[0.3rem] text-base py-[0.7rem] px-4 leading-[120%]",
    "border border-solid border-[#9c9c9c] text-black cursor-pointer transition-all duration-300",
    "ease-linear bg-[#e1e1e1] active:scale-[0.95] disabled:cursor-not-allowed",
    "enabled:hover:shadow-[inset_0_0_0_1px_#000]",
  ];

  if (locked) {
    if (isCorrectAnswer && isSelected) {
      parts.push("bg-[#5db05d] shadow-[inset_0_0_0_2px_#5db05d]");
    } else if (isCorrectAnswer) {
      parts.push("shadow-[inset_0_0_0_2px_#5db05d]");
    } else if (isSelected) {
      parts.push("bg-[#c95353] shadow-[inset_0_0_0_2px_#c95353]");
    }
  } else if (isSelected) {
    parts.push("shadow-[inset_0_0_0_0.8px_#000]");
  }

  return parts.join(" ");
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(() => new Set());
  /** After submit until Next: show correct/incorrect and disable answers */
  const [locked, setLocked] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = finished ? null : questions[currentIndex];
  const maxSelections = question
    ? question.answers.filter((a) => a.correct).length
    : 0;

  const startQuiz = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(new Set());
    setLocked(false);
    setFinished(false);
  }, []);

  const toggleAnswer = useCallback(
    (index) => {
      if (locked || finished || !question) return;

      setSelected((prev) => {
        const next = new Set(prev);
        if (maxSelections === 1) {
          next.clear();
          next.add(index);
          return next;
        }
        if (next.has(index)) {
          next.delete(index);
        } else if (next.size < maxSelections) {
          next.add(index);
        }
        return next;
      });
    },
    [locked, finished, question, maxSelections],
  );

  const handleSubmit = useCallback(() => {
    if (!question || locked || finished) return;

    let selectedCorrect = 0;
    let selectedIncorrect = 0;
    for (const i of selected) {
      if (question.answers[i]?.correct) selectedCorrect++;
      else selectedIncorrect++;
    }

    if (selectedCorrect === maxSelections && selectedIncorrect === 0) {
      setScore((s) => s + 1);
    }
    setLocked(true);
  }, [question, locked, finished, selected, maxSelections]);

  const handlePrimary = useCallback(() => {
    if (finished) {
      startQuiz();
      return;
    }
    if (!locked) {
      handleSubmit();
      return;
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setSelected(new Set());
      setLocked(false);
    } else {
      setFinished(true);
    }
  }, [finished, locked, currentIndex, handleSubmit, startQuiz]);

  const primaryLabel = useMemo(() => {
    if (finished) return "Play again";
    if (locked) return "Next";
    return "Submit";
  }, [finished, locked]);

  const headline = finished
    ? `You scored ${score} out of ${questions.length}!!!`
    : question.question;

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      <div
        className={
          "w-full max-w-2xl rounded-lg bg-[#e1e1e1] px-6 py-4 text-black " +
          "md:w-[40%]"
        }
      >
        <h1 className="mb-2 text-[2rem] font-medium leading-tight">
          Quick Quiz
        </h1>

        <div className="question">
          <h3 className="text-base font-normal leading-snug">{headline}</h3>
        </div>

        {!finished && question && (
          <div className="my-4 grid grid-cols-1 gap-2">
            {question.answers.map((answer, index) => {
              const isSelected = selected.has(index);
              const isCorrectAnswer = answer.correct;

              return (
                <button
                  key={`${currentIndex}-${index}`}
                  type="button"
                  disabled={locked}
                  className={answerButtonClass({
                    locked,
                    isSelected,
                    isCorrectAnswer,
                  })}
                  onClick={() => toggleAnswer(index)}
                >
                  {answer.text}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            type="button"
            className={
              "cursor-pointer rounded-[0.3rem] border border-solid border-[#9c9c9c] " +
              "bg-[#e1e1e1] px-4 py-2 text-base text-[#2d2c2c] transition-all duration-300 " +
              "ease-linear hover:shadow-[inset_0_0_0_1px_#000] active:scale-[0.95]"
            }
            onClick={handlePrimary}
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </main>
  );
}
