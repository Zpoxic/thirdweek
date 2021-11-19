// 사용자가 내용을 올바르게 입력하였는지 확인합니다.
function isValidContents(contents) {
    if (contents == '') {
        alert('내용을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 140) {
        alert('공백 포함 140자 이하로 입력해주세요');
        return false;
    }
    return true;
}
// 작성자 내용을 입력 하였는지 확인합니다.
function  isValNameContents(namecontents){
    if (namecontents == ''){
        alert('이름을 입력해주세요');
        return false;
    }
    return true;
}
// 작성자 내용을 입력 하였는지 확인합니다.
function  isValTitleContents(titlecontents){
    if (titlecontents == ''){
        alert('제목을 입력해주세요');
        return false;
    }
    return true;
}

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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    // HTML 문서를 로드할 때마다 실행합니다.
    getMessages();
})

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
                let title = postcard.titlecontents;
                let username = postcard.username;
                let contents = postcard.contents;
                let modifiedAt = postcard.modifiedAt;
                addHTML(id,username,contents,modifiedAt);
            }
        }
    })
}

// 메모 하나를 HTML로 만들어서 body 태그 내 원하는 곳에 붙입니다.
function addHTML(id, title, username, contents, modifiedAt) {
    // 1. HTML 태그를 만듭니다.
    let tempHtml = `<div class="card">
        <!-- date/username 영역 -->
        <div class="metadata">
            <div class="title">
                ${title}
            </div>
            <div class="date">
                ${modifiedAt}
            </div>
            <div id="${id}-username" class="username">
                 ${username}
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
            <img id="${id}-edit" class="icon-start-edit" src="img/edit.png" alt="" onclick="editPost('${id}')">
            <img id="${id}-delete" class="icon-delete" src="img/delete.png" alt="" onclick="deleteOne('${id}')">
            <img id="${id}-submit" class="icon-end-edit" src="img/done.png" alt="" onclick="submitEdit('${id}')">
        </div>
    </div>`;
    // 2. #cards-box 에 HTML을 붙인다.
    $('#cards-box').append(tempHtml);
}

// 메모를 생성합니다.
function writePost() {
    // 1. 작성한 메모를 불러옵니다.
    let contents = $('#contents').val();
    let namecontents = $('#namecontents').val();
    let titlecontents = $('#titlecontents').val();
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(contents) == false) {
        return;
    }
    // 이름 입력 받았는지 확인
    if (isValNameContents(namecontents)==false){
        return;
    }
    // 제목 입력 받았는지 확인합니다.
    if(isValTitleContents(titlecontents)==false){
        return;
    }
    // let username = genRandomName(10);
    // 4. 전달할 data JSON으로 만듭니다.
    let data = {'title': titlecontents, 'username': namecontents, 'contents': contents};
    // 5. POST /api/memos 에 data를 전달합니다.
    $.ajax({
        type: "POST",
        url: "/api/postcards",
        contentType: "application/json", // JSON 형식으로 전달함을 알리기
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지가 성공적으로 작성되었습니다.');
            window.location.href='index.html';
        }
    });
}

// 메모를 수정합니다.
function submitEdit(id) {
    // 1. 작성 대상 메모의 username과 contents 를 확인합니다.
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    // 3. 전달할 data JSON으로 만듭니다.
    // 4. PUT /api/memos/{id} 에 data를 전달합니다.
}

// 메모를 삭제합니다.
function deleteOne(id) {
    // 1. DELETE /api/memos/{id} 에 요청해서 메모를 삭제합니다.
}