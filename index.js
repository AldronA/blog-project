import express from "express"

const app = express();
const port = 3000;

let posts = [];

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.render("index.ejs", {posts:posts});
});

app.get("/compose", (req, res) =>{
    res.render("compose.ejs")
})

app.get("/edit", (req, res) =>{
    res.render("edit.ejs")
})

app.post("/compose", (req, res) => {
    const post = {
      id: Date.now().toString(),
      title: req.body.postTitle,
      content: req.body.postBody
    };
    posts.push(post);
    res.redirect("/");
  });

  app.get("/edit/:id", (req, res) => {
    const post = posts.find(p => p.id === req.params.id);
    res.render("edit", { post: post });
  });
  
  app.post("/edit/:id", (req, res) => {
    const index = posts.findIndex(p => p.id === req.params.id);
    posts[index].title = req.body.postTitle;
    posts[index].content = req.body.postBody;
    res.redirect("/");
  });
  
  app.post("/delete/:id", (req, res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.redirect("/");
  });

  
app.listen(port, () =>{
    console.log(`Server running on port ${port}`);
});