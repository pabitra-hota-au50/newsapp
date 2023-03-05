// console.log("i am a new page");
let artPerPage;
let totalPage;
let query = window.location.search.split('?')[1].split('&')[0].split('=')[1];
let page = parseInt(window.location.search.split('?')[1].split('&')[1].split('=')[1]);
console.log(query, page)

const newsFetch = async (query, page) => {
    if (query == undefined || query == " " || page == undefined) {
        query = "all"; page = 1;
    }
    //fetching api
    let a = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=d9ad18c480b848968d996eb1f8551fb0&pagesize=15&page=${page}`);
    let r = await a.json();
    console.log(r);
    //replacing + sign in query with empty space
    queryText.innerHTML = query.replace("+", " ");
    queryResults.innerHTML = r.totalResults;
    totalPage = Math.ceil(r.totalResults / artPerPage);
    //previous and next page change
    pre.href = `/?q=${query}&pageno=${page - 1}`
    next.href = `/?q=${query}&pageno=${page + 1}`
    //adding data to card
    let string = " "

    for (let item of r.articles) {
        let date = new Date(item.publishedAt).toLocaleDateString();
        string = string + `  <div class="card mb-3 m-2" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${item.urlToImage}" class="img-fluid rounded-start" >
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.description}</p>
                <p class="card-text"><small class="text-muted">Published :${date}</small></p>
                <a href="${item.url}" target="_blank" class="btn btn-primary">Read More Here...</a>
            </div>
        </div>
    </div>
</div>`
    } content.innerHTML = string;

}
newsFetch(query, page)


function myFunction() {
    var home = document.getElementById("home");
    if (home.style.display === "none") {
        home.style.display = "block";
    } else {
        home.style.display = "none";
    }
}
