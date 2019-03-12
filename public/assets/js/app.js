$("#add-note").on("click", e => {
    e.preventDefault();

    const articleID = $("#article-id-for-note").text();
    const noteTitle = $("#note-title").val();
    const noteBody = $("#note-body").val();

    $.ajax({
        method: "POST",
        url: `/articles/${articleID}`,
        data: {
            title: noteTitle,
            body: noteBody
        }
    })
        .then(data => {
            $("#previous-notes").append("<div>" + `Title: ${data.title} | Note: ${data.body}` + " " + "<button>" + "Delete" + "</button>" + "</div>");
        });
    
    $("#note-title").val("");
    $("#note-body").val("");
});
   