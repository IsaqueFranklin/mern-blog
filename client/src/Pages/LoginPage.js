export default function LoginPage() {
    return (
        <form className="login" action="">
            <h1>Login</h1>
            <input type="text" placeholder="Usuário" />
            <input type="password" placeholder="Senha" />
            <button>Login</button>
        </form>
    );
}