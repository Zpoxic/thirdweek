$(document).ready(function () {
    // HTML 문서를 로드할 때마다 실행합니다.
    getMessages();
})

function editPost(id) {
    showEdits(id);
    let contents = $(`#${id}-contents`).text().trim();
    $(`#${id}-textarea`).val(contents);
}

function showEdits(id) {
    $(`#${id}-editarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();

    $(`#${id}-contents`).hide();
    $(`#${id}-edit`).hide();
}

function hideEdits(id) {
    $(`#${id}-editarea`).hide();
    $(`#${id}-submit`).hide();
    $(`#${id}-delete`).hide();

    $(`#${id}-contents`).show();
    $(`#${id}-edit`).show();
}

function goPage(id) {
    location.href=`detailPost.html/${id}`;
}

// 메모를 불러와서 보여줍니다.
function getMessages() {
    // 1. 기존 메모 내용을 지웁니다.
    $('#cards-box').empty();
    // 2. 메모 목록을 불러와서 HTML로 붙입니다.
    $.ajax({
        type: 'GET',
        url: '/api/postcards',
        success: function (response) {
            console.log(response);
            for(let i=0;i<response.length;i++){
                let postcard = response[i];
                let id = postcard.id;
                let title = postcard.title;
                let username = postcard.username;
                let contents = postcard.contents;
                let modifiedAt = postcard.modifiedAt;
                addHTML(id,title,username,contents,modifiedAt);
            }
        }
    })
}

// 메모 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
function addHTML(id, title, username, contents, modifiedAt) {
    // 1. HTML 태그를 만듭니다.
    let tempHtml = `
        <div class="card">
        <!-- date/username 영역 -->
        <div class="metadata">
            <div id="${id}-title" class="title">
                <a class="font">제목 : </a>
                ${title}
            </div>
            <div id="${id}-username" class="username">
                <a class="font">작성자 : </a>
                ${username}
            </div>
            <div class="date">
                <a class="font">작성일자 : </a>
                ${modifiedAt}
            </div>
        </div>
        <!-- contents 조회/수정 영역-->
        <div class="contents">
            <div id="${id}-contents" class="text">
                ${contents}
            </div>
            <div id="${id}-editarea" class="edit">
                <textarea id="${id}-textarea" class="te-edit" name="" id="" cols="30" rows="5"></textarea>
            </div>
        </div>
        <!-- 버튼 영역-->
        <div class="footer">
            <img id="${id}-detail" class="detail" src="img/detail.png" alt="" onclick="location.href='detailPost.html?id=${id}';get_param()">
          <!--<img id="${id}-edit" class="icon-start-edit" src="img/detail.png" alt="" onclick="editPost(${id})">-->
            <img id="${id}-delete" class="icon-delete" src="img/delete.png" alt="" onclick="deleteOne(${id})">
            <img id="${id}-submit" class="icon-end-edit" src="img/done.png" alt="" onclick="submitEdit(${id})">
        </div>
    </div>`;
    // 2. #cards-box 에 HTML을 붙인다.
    $('#cards-box').append(tempHtml);
}
// <!-- 버튼 영역-->
// <div class="footer">
//     <img id="${id}-edit" class="icon-start-edit" src="img/edit.png" alt="" onclick="editPost('${id}')">
//         <img id="${id}-delete" class="icon-delete" src="img/delete.png" alt="" onclick="deleteOne('${id}')">
//             <img id="${id}-submit" class="icon-end-edit" src="img/done.png" alt="" onclick="submitEdit('${id}')">
// </div>

