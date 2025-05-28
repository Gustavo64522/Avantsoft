import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type AuthProps = {
  mode: "signin" | "signup";
};

type FeedbackMessage = {
  type: "error" | "success";
  text: string;
};

export default function Auth({ mode }: AuthProps) {
  const isSignupMode = mode === "signup";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedbackMessage, setFeedbackMessage] =
    useState<FeedbackMessage | null>(null);

  const { signin, signup } = useAuth();
  const navigate = useNavigate();

  const showMessage = (message: FeedbackMessage, timeout = 3000) => {
    setFeedbackMessage(message);
    setTimeout(() => setFeedbackMessage(null), timeout);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isSignupMode && password !== confirmPassword) {
      showMessage({ type: "error", text: "Senhas não conferem." });
      return;
    }

    if (isSignupMode) {
      const signupError = signup(email, password);
      if (signupError) {
        showMessage({ type: "error", text: signupError });
        return;
      }

      showMessage({ type: "success", text: "Conta criada com sucesso!" });
      setTimeout(() => navigate("/signin"), 3000);
      return;
    }

    const signinError = signin(email, password);
    if (signinError) {
      showMessage({ type: "error", text: signinError });
      return;
    }

    navigate("/stats");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {feedbackMessage && (
          <div
            className={`mb-4 px-4 py-2 rounded text-sm font-medium ${
              feedbackMessage.type === "error"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {feedbackMessage.text}
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {isSignupMode ? "Criar Conta" : "Entrar"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {isSignupMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Senha
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg"
          >
            {isSignupMode ? "Criar Conta" : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {isSignupMode ? (
            <>
              Já tem conta?{" "}
              <Link
                to="/signin"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Entrar
              </Link>
            </>
          ) : (
            <>
              Não tem conta?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Criar Conta
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
