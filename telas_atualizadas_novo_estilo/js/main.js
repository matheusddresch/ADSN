// Substitua pelos dados do seu app
const APP_ID = "XVnIOcER64ZDhsX9LZYspRZxEppp3DYhyPiCNUjY";
const JS_KEY = "FcSDVcBcxBSOMGTI2VGlWVYyJPcNdGDZ8u4olpH0";
Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = "https://parseapi.back4app.com";

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    const cadastroforms = document.getElementById("cadastroforms");
    const productForm = document.getElementById("productForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const username = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            try {
                await Parse.User.logIn(username, password);
                window.location.href = "home.html";
                
            } catch (error) {
                // alert("Erro no login: " + error.message);
                const err = document.getElementById("erro-login");

                if (error.message === "Invalid username/password.") {
                    err.innerHTML = "Usuário ou senha inválidos!";
                    err.style.display = "inline";
                    alert("Usuário ou senha inválidos. Verifique seus dados.");
                } else {
                    alert("Erro ao fazer login: " + error.message);
                }
            }
        });
    }

    if (cadastroforms) {
        cadastroforms.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const telefone = document.getElementById("telefone").value;
            const cidade = document.getElementById("cidade").value;
            const cpf = document.getElementById("cpf").value;
            const senha = document.getElementById("senha").value;


            const newUser = new Parse.User();
            newUser.set("username", email);
            newUser.set("name", nome);
            newUser.set("telefone", telefone);
            newUser.set("cidade", cidade);
            newUser.set("cpf", cpf);
            newUser.set("email", email);
            newUser.set("password", senha);

            try {
                await newUser.signUp();
                alert(`Usuário cadastrado com sucesso!`);
                userForm.reset();


            } catch (error) {
                const err = document.getElementById("erro-login");

                if (error.message === "Invalid username/password.") {
                    err.textContent = "Usuário ou senha inválidos. Verifique seus dados.";
                    err.style.display = "inline";
                    alert("Usuário ou senha inválidos. Verifique seus dados.");
                } else {
                    alert("Erro ao fazer login: " + error.message);
                }
            }
            userForm.reset()
        });
    }

    if (productForm) {
        productForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("productName").value;
            const price = parseFloat(document.getElementById("productPrice").value);
            const Product = Parse.Object.extend("Produto");
            const product = new Product();
            product.set("nome", name);
            product.set("preco", price);
            try {
                await product.save();
                alert("Produto cadastrado com sucesso!");
                productForm.reset();
            } catch (error) {
                alert("Erro ao salvar produto: " + error.message);
            }
        });

    }
});
// Função para expandir o card

