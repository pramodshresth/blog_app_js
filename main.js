let blogList = [];
const blogsDiv = document.querySelector("#blogDetails");

//Add blog Function
function addBlog(){
    let titleField = document.querySelector("#titleField");
    let descriptionField = document.querySelector("#descriptionField");
    if(titleField.value.length==0 || descriptionField.value.length==0){
        alert("Something Wrong");
    }else{
        const newBlog = {
            id : (new Date()).getTime(),
            title : titleField.value,
            description: descriptionField.value,
            comment: [],
        }
        blogList.push(newBlog);
        titleField.value="";
        descriptionField.value="";
        displayBlogs();
    }
}


function displayBlogs(){
 if(blogList.length==0){
   blogsDiv.innerHTML = "No Blog";
 }else{
  blogLatest = blogList.reverse();
  blogsDiv.innerHTML = "";
   blogLatest.forEach(element =>{
     blogsDiv.innerHTML += `
     <div class="blog">
       <h4>${element.title}</h4>
      <p> ${element.description}</p>
      <input type="text" placeholder="Add Comment" class="commentField" >
      <input type="button" value="Add Cmt" id="submit" onClick="addComment(${element.id})"> 
      <div class="commentDiv"></div>
     </div>
     `
    },
  )
 }
 }

function addComment(id){
for(i=0;i<=blogList.length; i++){
  if(blogList[i].id==id){
    var newComment = document.getElementsByClassName("commentField")[i];
    if(newComment.value==""){
      alert("Please Enter a Comment")
    }else{
      blogList[i].comment.push({
        id: Date.now(),
        comment: newComment.value,
      });
      newComment.value ="";
     displayComment(i);
     return;
    }
  }
}
}

function displayComment(index){
  let targetedDiv = document.getElementsByClassName("commentDiv")[index];
  targetedDiv.innerHTML="";
  blogList[index].comment.forEach(element=>{
  targetedDiv.innerHTML += `<div id="co">
  <p>${element.comment}</p>
  <input type="button" value="U" id="submit" onClick="updateComment(${index},${element.id})"> 
  <input type="button" value="D" id="D" onClick="deleteComment(${index},${element.id})">
  </div> `
})
}

function deleteComment(blogIndex, commentId){
  for(let i in blogList[blogIndex].comment){
    if(blogList[blogIndex].comment[i].id==commentId){
      blogList[blogIndex].comment.splice(i,1);
      displayComment(blogIndex);
      return;
    }}
}

function updateComment(blogIndex, commentId ){
 
   let new_comment= prompt("Update");
   for(let i in blogList[blogIndex].comment){
    if(blogList[blogIndex].comment[i].id==commentId){
      blogList[blogIndex].comment[i].comment=new_comment;
      displayComment(blogIndex);
      return;
    }}
}



