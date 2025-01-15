document.addEventListener("DOMContentLoaded", function(){
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainier = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLevel = document.getElementById("easy-level");
    const mediumLevel = document.getElementById("medium-level");
    const hardLevel = document.getElementById("hard-level");
    const cardStatsContainer = document.querySelector(".stats-card");

    function validateUsername(username){
        if(username.trim() === ""){
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {

        try{
            searchButton.textContent = "Searching..";
            searchButton.disabled = true;

            // const response = await fetch(url);
            const proxyUrl = 'https://cors-anywhere.herokupp.com/';
            const targetUrl = 'https://leetcode.com/graphql/';
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");
            const graphql = JSON.stringify({
            query: "\n query userSessionProgress($username: String!) {\n allQuestionsCount {\n difficulty\n count\n }\n matchedUser (username: $username) {\n submitStats {\n acSubmissionNum {\n difficulty\n count\n submission\n  }\n totalSubmissonNum {\n difficulty\n count\n submission\n }\n }\n }\n}\n  ", variables: {"username": `${username}`}
        })
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: graphql,
            redirect: "follow"
        };
        
        const response = await fetch(proxyUrl+targetUrl, requestOptions);
            if(!response.ok){
                throw new Error("Unable to fetch the User details");
            }
            let data = await response.json();
            console.log("Loggig data ", data);
        }
        catch(error){
            statsContainier.innerHTML = `<P>No Data Found</P>`
        }
        finally{
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }


    searchButton.addEventListener('click', function(){
        const username = usernameInput.value;
        console.log("Login username: ", username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})
