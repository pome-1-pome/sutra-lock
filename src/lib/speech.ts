/**
 * Thin wrapper around the Web Speech API (SpeechRecognition).
 * Works in Chrome / Edge (standard + webkit prefix).
 */

type SpeechRecognition = typeof globalThis extends { SpeechRecognition: infer T }
  ? T
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any;

function getRecognitionClass(): (new () => SpeechRecognition) | null {
  if (typeof window === "undefined") return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function isSpeechSupported(): boolean {
  return getRecognitionClass() !== null;
}

export type SpeechCallbacks = {
  /** Called whenever interim or final transcript text is available */
  onResult: (transcript: string, isFinal: boolean) => void;
  /** Called when recognition ends (naturally or by stop()) */
  onEnd: () => void;
  /** Called on any error */
  onError: (message: string) => void;
};

export type SpeechHandle = {
  stop: () => void;
};

/**
 * Start speech recognition for Japanese (ja-JP).
 * Returns a handle with a `stop()` method, or `null` if unsupported.
 */
export function startRecognition(cb: SpeechCallbacks): SpeechHandle | null {
  const Ctor = getRecognitionClass();
  if (!Ctor) {
    cb.onError("このブラウザは音声認識に対応していません");
    return null;
  }

  const recognition = new Ctor();
  recognition.lang = "ja-JP";
  recognition.interimResults = true;
  recognition.continuous = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (e: { results: { transcript: string; isFinal: boolean }[][] }) => {
    // Collect all result segments into a single string
    let transcript = "";
    let allFinal = true;
    for (let i = 0; i < e.results.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const seg = (e.results as any)[i];
      transcript += seg[0].transcript;
      if (!seg.isFinal) allFinal = false;
    }
    cb.onResult(transcript, allFinal);
  };

  recognition.onend = () => cb.onEnd();

  recognition.onerror = (e: { error: string }) => {
    const messages: Record<string, string> = {
      "not-allowed": "マイクのアクセスが許可されていません",
      "no-speech": "音声が検出されませんでした",
      aborted: "音声認識が中断されました",
      network: "ネットワークエラーが発生しました",
    };
    cb.onError(messages[e.error] ?? `音声認識エラー: ${e.error}`);
  };

  recognition.start();

  return {
    stop: () => {
      try {
        recognition.stop();
      } catch {
        // already stopped
      }
    },
  };
}
