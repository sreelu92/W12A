class BoredActivity {

    ajax;
    type;
    location;
    successFunction;
    loadingFunction;
    failureFunction;
    content;
    content1;

    constructor(httpType, url, success, loading, failure) {
        this.ajax = new XMLHttpRequest();
        this.type = httpType;
        this.location = url;
        this.successFunction = success;
        this.loadingFunction = loading;
        this.failureFunction = failure;

    }
    getActivity() {
        let holder = this;
        this.ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                holder.successFunction();
                let randomActivity=JSON.parse(this.responseText);
                holder.content ="Activity: "+ randomActivity.activity;
                document.getElementById("h1tag").innerHTML=holder.content;
                holder.content1 ="Price:"+ randomActivity.price;
                document.getElementById("h2tag").innerHTML=holder.content1;

            } else if (this.readyState != 4) {
                holder.loadingFunction();
            } else {
                holder.failureFunction();
            }

 
        };
        this.ajax.open(this.type, this.location, true);
        this.ajax.send();
    }
}

function onSuccess() {
    console.log(this.ajax.responseText);


}
function onLoading() {
    document.getElementById("h1tag").innerHTML="Loading";

}
function onFailure() {
    document.getElementById("h1tag").innerHTML="Something went wrong";

}

let myApi = new BoredActivity("GET", "http://www.boredapi.com/api/activity/", onSuccess, onLoading, onFailure);
function runApi() {
    myApi.getActivity();

}
document.getElementById("button1").addEventListener("click", runApi);

let myApi1 = new BoredActivity("GET", "http://www.boredapi.com/api/activity?participants=4", onSuccess, onLoading, onFailure);
function rungroupApi() {
    myApi1.getActivity();
}
document.getElementById("button2").addEventListener("click", rungroupApi);

let myApi2 = new BoredActivity("GET", "http://www.boredapi.com/api/activity?type=recreational", onSuccess, onLoading, onFailure);
function recreationalApi() {
    myApi2.getActivity();
}
document.getElementById("button3").addEventListener("click", recreationalApi);

let myApi4 = new BoredActivity("GET", "http://www.boredapi.com/api/activity?price=0.0", onSuccess, onLoading, onFailure);
function priceApi() {
    myApi4.getActivity();
}
document.getElementById("button4").addEventListener("click", priceApi);

let myApi5 = new BoredActivity("GET", "http://www.boredapi.com/api/activity?minprice=0&maxprice=0.1", onSuccess, onLoading, onFailure);
function priceRangeApi() {
    myApi5.getActivity();
}
document.getElementById("button5").addEventListener("click", priceRangeApi);
