// api url mizi tanımladık
const API_URL = "http://api.github.com/users/";

// kullanacağımız işlemleri tanımladık.sayfa içindeki elemanları yakaladık
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getUser(username) {
  try {
    const { data } = await axios(API_URL + username);
    // console.log(data);
    createUserCard(data);
    getRepos(username);
  } catch (err) {
    /* console.log(err); */
    createErrorCard("Üzgünüm...Böyle bir kullanıcı bulunamadı  :(");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});

// elde edilene verilere göre html de card div i oluşturuyoruz.
function createUserCard(user) {
  const userName = user.name || user.login;
  const userBio = user.bio ? `<p>${user.bio} </>` : " ";

  const cardHTML = ` 
    <div class="card">
         <img
            class="user-image"
            src="${user.avatar_url}"
            alt="${user.name}"
  />

            <div class="user-info">
                <div class="user-name">
                    <h2>${userName}</h2>
                    <small>${user.login}</small>
                </div>
            </div>

            <p>${userBio}
            </p>

            <ul>
                <li>
                    <i class="fa-solid fa-user-group"></i> ${user.followers}
                    <strong>Followers</strong>
                </li>
                <li>${user.following} <strong>Following</strong></li>
                <li>
                    <i class="fa-solid fa-bookmark"></i> ${user.public_repos} <strong>Repository</strong>
                </li>
            </ul>

            <div class="repos" id="repos">
           
            </div>


        </div>
       
    
    `;
  main.innerHTML = cardHTML;
}

//  aranılan kullanıcı yoksa hata kartı oluşturuyoruz
function createErrorCard(msg) {
  const cardErrorHTML = `
    
    <div class ="card">
        <h2>${msg} </h2> 
    
    
    `;

  main.innerHTML = cardErrorHTML;
}

async function getRepos(username) {
  try {
    const { data } = await axios(API_URL + username + "/repos");
    // console.log(data);
    addReposToCard(data);
  } catch (err) {
    // console.log(err);
    createErrorCard("Repoları çekerken hata oluştu...Üzgünüm  :(");
  }
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos.slice(0, 3).forEach((repo) => {
    const reposLink = document.createElement("a");
    reposLink.href = repo.html_url;
    reposLink.target = "_blank";
    reposLink.innerHTML = `
    
    <i class="fa-solid fa-book-bookmark"></i> ${repo.name} 
    
    `;

    reposEl.appendChild(reposLink);
  });
}
