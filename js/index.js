// get user input
document.addEventListener('DOMContentLoaded', createFormListener)
function createFormListener(){
    const form = document.querySelector('#github-form')
    const search = document.querySelector('#search')
    form.addEventListener('submit', handleSubmit)
}

// fetch user input from github

function handleSubmit(e){
    e.preventDefault()
    fetch(`https://api.github.com/search/users?q=${search.value}`)
        .then((resp) => resp.json())
        .then((results) => {
            removeUsers()
            removeRepos()
            const users = results.items
            console.log(results.items)
            users.forEach((user) => {
                createCard(user)
            })
        })
}

// fetch repos from github
function handleCardClick(e){
    const name = e.target.id
    fetch(`https://api.github.com/users/${name}/repos`)
        .then((resp) => resp.json())
        .then((repos) => {
            removeUsers()
            repos.forEach((repo) => {
                createRepoCard(repo)
            })
        })
}


// edit the DOM

function removeUsers(){
    let userList = document.querySelector('#user-list')
    userList.innerHTML = ''
}

function createCard(user){
    const userList = document.querySelector('#user-list')
    let userCard = document.createElement('li')
    userCard.className = 'user-card'
    userCard.id = user.login
    userCard.innerHTML = `
        <div>
            <img id='${user.login}' class='avatar' src='${user.avatar_url}'>
        </div>
        <div class ='login'>
            <h4 id='${user.login}'>${user.login}</h4>
        </div>
        <div id='${user.login}' class='profile-link'>
            <a href='${user.html_url}'>Link to profile</a>
        </div>
    `
    userCard.addEventListener('click', handleCardClick)
    userList.appendChild(userCard)
}

function createRepoCard(repo){
    const repoList = document.querySelector('#repos-list')
    let repoCard = document.createElement('li')
    repoCard.innerHTML = `${repo.name}`
    repoList.appendChild(repoCard)
}

function removeRepos(){
    let repoList = document.querySelector('#repos-list')
    repoList.innerHTML = ''
}