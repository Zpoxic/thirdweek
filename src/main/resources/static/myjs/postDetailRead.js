// get 파라미터 수령해오는 함수
function get_param() {
    let url = document.location.href;
    let qs = url.substring(url.indexOf('?') + 1).split('&');
    let result = {}
    for (let i = 0; i < qs.length; i++) {
        qs[i] = qs[i].split('=');
        result[qs[i][0]] = decodeURIComponent(qs[i][1]);
    }
    return result;
}

let parameters = get_param();
let id = parameters['id'];
if (id != '') {
    console.log(id);
    // 내용 출력
    $.ajax({
        type: 'GET',
        url: `/api/postcards/${id}`,
        success: function (response) {
            console.log(response);
            // $('#title').text(response.title);
            // $('#author').text(response.author);
            // $('#postDate').text(response.modifiedAt);
            // $('#content').text(response.content);
            for(let i=0;i<response.length;i++){
                let postcard = response[i];
                let id = postcard.id;
                let title = postcard.title;
                let username = postcard.username;
                let contents = postcard.contents;
                let modifiedAt = postcard.modifiedAt;
                console.log(id,title,username,contents,modifiedAt);
                detailHTML(id,title,username,contents,modifiedAt);
            }
        }
    })
}

// 메모를 불러와서 보여줍니다.
// function getDetailMessages(id) {
//     // location.href=`detailPost.html/${id}`;
//
//     // 1. 기존 메모 내용을 지웁니다.
//     $('#wrap-top').empty();
//
//     // 2. 메모 목록을 불러와서 HTML로 붙입니다.
//     $.ajax({
//         type: 'GET',
//         url: `/api/postcards/${id}`,
//         success: function (response) {
//             console.log(response);
//             for(let i=0;i<response.length;i++){
//                 let postcard = response[i];
//                 let id = postcard.id;
//                 let title = postcard.title;
//                 let username = postcard.username;
//                 let contents = postcard.contents;
//                 let modifiedAt = postcard.modifiedAt;
//                 console.log(id,title,username,contents,modifiedAt);
//                 detailHTML(id,title,username,contents,modifiedAt);
//             }
//         }
//     })
// }

function detailHTML(id, title, username, contents, modifiedAt){
    let temp_wrap = `<div class="header">
                        <h2>게시글 상세</h2>
                        <a href="index.html"><img src="img/home.png" alt=""></a>
                        <p>제목 : ${title}</p>
                        <p>작성자 : ${username}</p>
                        <p>작성일자 : ${modifiedAt}</p>
                        <p>코멘트 : ${contents}</p>
                        </div>`;
    $('#wrap-top').append(temp_wrap);
}