// 코멘트를 입력하였는지 확인합니다.
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

// 메모를 생성합니다.
function writePost() {
    // 1. 작성한 메모를 불러옵니다.
    let titlecontents = $('#titlecontents').val();
    let namecontents = $('#namecontents').val();
    let contents = $('#contents').val();

    // 제목 입력 받았는지 확인합니다.
    if(isValTitleContents(titlecontents)==false){
        return;
    }
    // 이름 입력 받았는지 확인
    if (isValNameContents(namecontents)==false){
        return;
    }
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(contents) == false) {
        return;
    }

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
