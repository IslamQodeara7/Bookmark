var BookmarkInput = document.getElementById("siteName");
var BookmarkURLinput = document.getElementById("siteURL");
let NameAlert = document.getElementById("NameAlert");
let URLAlert = document.getElementById("URLAlert");
let NameReg = /^[a-zA-Z]{3}([a-zA-Z 0-9]{1,15})?$/
let URLReg = /^(www)\.[a-zA-Z0-9 ]{5,20}\.[A-Za-z]{2,7}$/
let NameTest = document.getElementById("NameTest");
let URLTest = document.getElementById("URLTest");
let success = document.getElementById("success");
let buttonDiv = document.querySelector(".buttons");
let edit = document.querySelector('.edit');
let add = document.querySelector('.add');
var bookmarkList = [];
NameAlert.style.display = "none";
URLAlert.style.display = "none";
NameTest.style.display = "none";
URLTest.style.display = "none";
success.style.display = "none";
edit.style.display = "none";
if (localStorage.getItem("bookmark-list") != null) {
    bookmarkList = JSON.parse(localStorage.getItem("bookmark-list"));
    displayBookMark();
}
else {
    bookmarkList = [];
}



function displayBookMark() {
    var temp = '';
    for (var i = 0; i < bookmarkList.length; i++) {
        temp += `<div id="resultDiv" class="resultDiv bg-light col-md-5 text-center p-5 my-3  m-auto">
            <h2>${bookmarkList[i].bookName}</h2>
           <div class="buttons">
               <a href="https://${bookmarkList[i].bookURL}" 
               target = "_blank" class="btn btn-outline-info visit" ">Visit  <i class="fa-solid fa-arrow-pointer mx-2"></i></a>
               <button class="btn mx-2 delete btn btn-outline-danger" onclick = "deleteBookmark(${i})">Delete  <i class="fa-solid fa-minus mx-2"></i></button>
               <button class="btn mx-2 btn btn-outline-warning" onclick = "updateBookmark(${i})">Update  <i class="fa-solid fa-triangle-exclamation mx-2"></i></button>

           </div>
        </div>`
    }
    document.getElementById("resultBox").innerHTML = temp;
}

function deleteBookmark(digit) {
    bookmarkList.splice(digit, 1);
    localStorage.setItem("bookmark-list", JSON.stringify(bookmarkList));
    displayBookMark();
}

function addBookmark() {
    if (BookmarkInput.value.length > 0 && BookmarkURLinput.value.length > 0) {
        NameAlert.style.display = "none";
        URLAlert.style.display = "none";
        if (NameReg.test(BookmarkInput.value)) {
            if (URLReg.test(BookmarkURLinput.value)) {
                var bookmarkObj = {
                    bookName: BookmarkInput.value,
                    bookURL: BookmarkURLinput.value,
                }
                bookmarkList.push(bookmarkObj);
                localStorage.setItem("bookmark-list", JSON.stringify(bookmarkList));
                BookmarkInput.value = '';
                BookmarkURLinput.value = '';
                NameAlert.style.display = "none";
                URLAlert.style.display = "none";
                NameTest.style.display = "none";
                URLTest.style.display = "none";
                success.style.display = "block";
            }
            else{
                NameAlert.style.display = "none";
                URLAlert.style.display = "none";
                NameTest.style.display = "none";
                URLTest.style.display = "block";
                success.style.display = "none";
            }
        }
        else {
            NameAlert.style.display = "none";
            NameTest.style.display = "block";
            

        }
    }
    else {
        if (BookmarkInput.value.length == 0) {
            document.getElementById("NameAlert").style = "display: block;"
        }
        if (BookmarkURLinput.value.length == 0) {
            document.getElementById("URLAlert").style = "display: block;"
        }
    }
    displayBookMark();
}
let updateHelper = -1;
function updateBookmark(digit) {
    updateHelper = digit;
    BookmarkInput.value = bookmarkList[digit].bookName;
    BookmarkURLinput.value = bookmarkList[digit].bookURL;
    add.style.display = "none";
    edit.style.display = "inline";

}

function submitUpdate(){
    if (BookmarkInput.value.length > 0 && BookmarkURLinput.value.length > 0) {
        NameAlert.style.display = "none";
        URLAlert.style.display = "none";
        if (NameReg.test(BookmarkInput.value)) {
            if (URLReg.test(BookmarkURLinput.value)) {
               bookmarkList[updateHelper].bookName = BookmarkInput.value;
               bookmarkList[updateHelper].bookURL = BookmarkURLinput.value;
                localStorage.setItem("bookmark-list", JSON.stringify(bookmarkList));
                BookmarkInput.value = '';
                BookmarkURLinput.value = '';
                NameAlert.style.display = "none";
                URLAlert.style.display = "none";
                NameTest.style.display = "none";
                URLTest.style.display = "none";
                success.style.display = "block";
                add.style.display = "inline";
                edit.style.display = "none";
            }
            else{
                NameAlert.style.display = "none";
                URLAlert.style.display = "none";
                NameTest.style.display = "none";
                URLTest.style.display = "block";
                success.style.display = "none";
            }
        }
        else {
            NameAlert.style.display = "none";
            NameTest.style.display = "block";
            

        }
    }
    else {
        if (BookmarkInput.value.length == 0) {
            document.getElementById("NameAlert").style = "display: block;"
        }
        if (BookmarkURLinput.value.length == 0) {
            document.getElementById("URLAlert").style = "display: block;"
        }
    }
    displayBookMark();

}

function clearInput(){
    BookmarkInput.value = "";
    BookmarkURLinput.value = "";
}


/* <div id="resultDiv" class="resultDiv d-flex justify-content-evenly
align-items-center p-3 my-3  m-auto">
    <h2>Bookmark</h2>
   <div class="buttons">
       <a href="" class="btn mx-2 visit">Visit</a>
       <button class="btn mx-2 delete">Delete</button>
   </div>
</div> */
